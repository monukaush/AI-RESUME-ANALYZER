import json
import pypdf

from django.conf import settings
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from google import genai

from .models import (
    UserProfile,
    Resume,
    ResumeAnalysis,
    JobDescription,
    ATSMatchAnalysis,
)

from .serializers import (
    JobDescriptionSerializer,
    ATSMatchAnalysisSerializer,
)


def analyze_resume_with_gemini(resume_text, jd_text):
    if not settings.GEMINI_API_KEY:
        raise ValueError("Gemini API key is not configured.")

    client = genai.Client(api_key=settings.GEMINI_API_KEY)

    prompt = f"""
You are an expert ATS (Applicant Tracking System) matching engine.

Compare the given resume with the job description.

Return ONLY valid JSON in exactly this format:

{{
    "ats_score": 0,
    "matched_keywords": [],
    "missing_keywords": [],
    "matching_skills": [],
    "recommendations": []
}}

Rules:
- ats_score must be an integer between 0 and 100.
- matched_keywords must list relevant keywords present in both resume and job description.
- missing_keywords must list important keywords present in job description but missing in resume.
- matching_skills must list skills present in both texts.
- recommendations must contain 3 to 5 actionable suggestions to improve the resume match score.
- Return JSON only. Do not use markdown blocks or explanation outside JSON.

Job Description:
{jd_text}

Resume:
{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    response_text = response.text.strip()

    if response_text.startswith("```"):
        response_text = response_text.replace("```json", "").replace("```", "").strip()

    return json.loads(response_text)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if not name or not email or not password or not confirm_password:
        return Response(
            {'error': 'All fields are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if password != confirm_password:
        return Response(
            {'error': 'Passwords do not match.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email is already registered.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    first_name = name.split(' ')[0]
    last_name = ' '.join(name.split(' ')[1:]) if ' ' in name else ''

    User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    return Response(
        {
            'message': 'User registered successfully.'
        },
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    data = request.data

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response(
            {
                'error': 'Email and password are required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {
                'error': 'Invalid email or password.'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.check_password(password):
        return Response(
            {
                'error': 'Invalid email or password.'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            'message': 'Login successful.',
            'user': {
                'id': user.id,
                'email': user.email,
                'name': f"{user.first_name} {user.last_name}".strip()
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_resume(request):
    resume_file = request.FILES.get('resume')

    if not resume_file:
        return Response(
            {
                'error': 'Resume file is required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if not resume_file.name.lower().endswith('.pdf'):
        return Response(
            {
                'error': 'Only PDF files are allowed.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    max_size = 5 * 1024 * 1024

    if resume_file.size > max_size:
        return Response(
            {
                'error': 'File size must be less than 5MB.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        reader = pypdf.PdfReader(resume_file)

        extracted_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text + "\n"

        extracted_text = extracted_text.strip()

        if not extracted_text:
            return Response(
                {
                    'error': 'Could not extract text from this PDF.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        resume_file.seek(0)

        resume = Resume.objects.create(
            user=request.user,
            resume_file=resume_file,
            file_name=resume_file.name,
            extracted_text=extracted_text
        )

        return Response(
            {
                'message': 'Resume uploaded and text extracted successfully.',
                'resume': {
                    'id': resume.id,
                    'file_name': resume.file_name,
                    'file_url': resume.resume_file.url,
                    'text_length': len(extracted_text),
                    'uploaded_at': resume.uploaded_at
                }
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response(
            {
                'error': 'Failed to process PDF.',
                'details': str(e)
            },
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ats_match(request):
    resume_id = request.data.get('resume_id')
    job_description_id = request.data.get('job_description_id')

    if not resume_id or not job_description_id:
        return Response(
            {
                'error': 'resume_id and job_description_id are required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    resume = Resume.objects.filter(
        id=resume_id,
        user=request.user
    ).first()

    if not resume:
        return Response(
            {
                'error': 'Resume not found.'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    job_description = JobDescription.objects.filter(
        id=job_description_id,
        user=request.user
    ).first()

    if not job_description:
        return Response(
            {
                'error': 'Job description not found.'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if not resume.extracted_text:
        return Response(
            {
                'error': 'Resume text has not been extracted yet.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    resume_text = resume.extracted_text
    jd_text = job_description.description

    try:
        ai_result = analyze_resume_with_gemini(
            resume_text,
            jd_text
        )
    except Exception as e:
        return Response(
            {
                'error': 'Gemini analysis failed.',
                'details': str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    analysis = ATSMatchAnalysis.objects.create(
        user=request.user,
        resume=resume,
        job_description=job_description,
        ats_score=ai_result.get('ats_score', 0),
        matched_keywords=ai_result.get('matched_keywords', []),
        missing_keywords=ai_result.get('missing_keywords', []),
        matching_skills=ai_result.get('matching_skills', []),
        recommendations=ai_result.get('recommendations', [])
    )

    return Response(
        {
            'message': 'ATS analysis completed successfully.',
            'analysis': ATSMatchAnalysisSerializer(
                analysis
            ).data
        },
        status=status.HTTP_201_CREATED
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    
    user = request.user

    profile, _ = UserProfile.objects.get_or_create(
        user=user
    )

    skills_list = [
        s.strip()
        for s in profile.skills.split(',')
        if s.strip()
    ] if profile.skills else []

    return Response(
        {
            'name': f"{user.first_name} {user.last_name}".strip(),
            'email': user.email,
            'phone': profile.phone,
            'location': profile.location,
            'preferred_role': profile.preferred_role,
            'experience': profile.experience,
            'expected_salary': profile.expected_salary,
            'preferred_location': profile.preferred_location,
            'skills': skills_list,
            'github': profile.github,
            'linkedin': profile.linkedin,
            'portfolio': profile.portfolio,
            'leetcode': profile.leetcode
        },
        status=status.HTTP_200_OK
    )
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_resume(request, resume_id):

    resume = Resume.objects.filter(
        id=resume_id,
        user=request.user
    ).first()

    if not resume:
        return Response(
            {'error': 'Resume not found.'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Delete uploaded PDF file
    if resume.resume_file:
        resume.resume_file.delete(save=False)

    # Delete database record
    # Related ResumeAnalysis and ATSMatchAnalysis
    # will also be deleted because of CASCADE.
    resume.delete()

    return Response(
        {
            'message': 'Resume deleted successfully.'
        },
        status=status.HTTP_200_OK
    )

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
   data = request.data
   user = request.user

   name = data.get('name', '')

   if name:
    parts = name.split(' ')

    user.first_name = parts[0]

    user.last_name = (
        ' '.join(parts[1:])
        if len(parts) > 1
        else ''
    )

    user.save()


    skills_input = data.get('skills', '')

    if isinstance(skills_input, list):
        skills_str = ', '.join(skills_input)
    else:
        skills_str = str(skills_input)

    profile, _ = UserProfile.objects.get_or_create(
        user=user
    )

    profile.phone = data.get('phone', profile.phone)
    profile.location = data.get('location', profile.location)
    profile.preferred_role = data.get('preferred_role', profile.preferred_role)
    profile.experience = data.get('experience', profile.experience)
    profile.expected_salary = data.get('expected_salary', profile.expected_salary)
    profile.preferred_location = data.get('preferred_location', profile.preferred_location)
    profile.skills = skills_str
    profile.github = data.get('github', profile.github)
    profile.linkedin = data.get('linkedin', profile.linkedin)
    profile.portfolio = data.get('portfolio', profile.portfolio)
    profile.leetcode = data.get('leetcode', profile.leetcode)

    profile.save()

    skills_list = [
        s.strip()
        for s in profile.skills.split(',')
        if s.strip()
    ] if profile.skills else []

    return Response(
        {
            'message': 'Profile updated successfully.',
            'profile': {
                'name': f"{user.first_name} {user.last_name}".strip(),
                'email': user.email,
                'phone': profile.phone,
                'location': profile.location,
                'preferred_role': profile.preferred_role,
                'experience': profile.experience,
                'expected_salary': profile.expected_salary,
                'preferred_location': profile.preferred_location,
                'skills': skills_list,
                'github': profile.github,
                'linkedin': profile.linkedin,
                'portfolio': profile.portfolio,
                'leetcode': profile.leetcode
            }
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def analyze_resume(request, resume_id):

    resume = Resume.objects.filter(
        id=resume_id,
        user=request.user
    ).first()

    if not resume:
        return Response(
            {
                'error': 'Resume not found.'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if not resume.extracted_text:
        return Response(
            {
                'error': 'Resume text has not been extracted.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if not settings.GEMINI_API_KEY:
        return Response(
            {
                'error': 'Gemini API key is not configured.'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    try:
        client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

        prompt = f"""
You are an expert ATS resume analyzer.

Analyze the resume below carefully.

Return ONLY valid JSON in exactly this format:

{{
    "ats_score": 0,
    "skills": [],
    "missing_keywords": [],
    "strengths": [],
    "suggestions": []
}}

Rules:

- ats_score must be an integer between 0 and 100.
- skills must contain skills actually present in the resume.
- missing_keywords should contain useful keywords, technologies, skills, or resume terms that could improve the resume.
- strengths should contain 3 to 5 specific strengths based on the resume.
- suggestions should contain 3 to 5 practical improvements.
- Do not invent experience, skills, companies, projects, or achievements.
- Return JSON only.
- Do not use markdown.
- Do not add explanations outside the JSON.

Resume:

{resume.extracted_text}
"""

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt
        )

        response_text = response.text.strip()

        if response_text.startswith("```"):
            response_text = response_text.replace(
                "```json",
                ""
            ).replace(
                "```",
                ""
            ).strip()

        result = json.loads(response_text)

        ats_score = int(
            result.get('ats_score', 0)
        )

        ats_score = max(
            0,
            min(100, ats_score)
        )

        skills = result.get('skills', [])
        missing_keywords = result.get('missing_keywords', [])
        strengths = result.get('strengths', [])
        suggestions = result.get('suggestions', [])

        analysis, created = ResumeAnalysis.objects.update_or_create(
            resume=resume,
            defaults={
                'ats_score': ats_score,
                'skills': skills,
                'missing_keywords': missing_keywords,
                'strengths': strengths,
                'suggestions': suggestions
            }
        )

        return Response(
            {
                'message': 'Resume analyzed successfully.',
                'analysis': {
                    'resume_id': resume.id,
                    'ats_score': analysis.ats_score,
                    'skills': analysis.skills,
                    'missing_keywords': analysis.missing_keywords,
                    'strengths': analysis.strengths,
                    'suggestions': analysis.suggestions
                }
            },
            status=status.HTTP_200_OK
        )

    except json.JSONDecodeError:
        return Response(
            {
                'error': 'Gemini returned invalid JSON.'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    except Exception as e:
        return Response(
            {
                'error': 'Gemini analysis failed.',
                'details': str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def history(request):

    resumes = Resume.objects.filter(
        user=request.user
    ).order_by('-uploaded_at')

    history_data = []

    for resume in resumes:

        analysis = ResumeAnalysis.objects.filter(
            resume=resume
        ).first()

        history_data.append({
            'resume_id': resume.id,
            'file_name': resume.file_name,
            'uploaded_at': resume.uploaded_at,
            'ats_score': analysis.ats_score if analysis else 0,
            'skills': analysis.skills if analysis else [],
            'missing_keywords': (
                analysis.missing_keywords
                if analysis else []
            ),
            'strengths': (
                analysis.strengths
                if analysis else []
            ),
            'suggestions': (
                analysis.suggestions
                if analysis else []
            ),
        })

    return Response(
        {
            'count': len(history_data),
            'history': history_data
        },
        status=status.HTTP_200_OK
    )


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def job_descriptions(request):

    if request.method == 'GET':
        jobs = JobDescription.objects.filter(
            user=request.user
        ).order_by('-created_at')

        serializer = JobDescriptionSerializer(jobs, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method == 'POST':
        serializer = JobDescriptionSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def job_description_detail(request, job_id):

    job = JobDescription.objects.filter(
        id=job_id,
        user=request.user
    ).first()

    if not job:
        return Response(
            {'error': 'Job description not found.'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        serializer = JobDescriptionSerializer(job)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method == 'PUT':
        serializer = JobDescriptionSerializer(
            job,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    if request.method == 'DELETE':
        job.delete()

        return Response(
            {'message': 'Job description deleted successfully.'},
            status=status.HTTP_200_OK
        )
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ats_history(request):
    analyses = ATSMatchAnalysis.objects.filter(
        user=request.user
    ).select_related(
        'resume',
        'job_description'
    ).order_by('-created_at')

    data = []

    for analysis in analyses:
        data.append({
            'id': analysis.id,
            'resume_id': analysis.resume.id,
            'resume_name': analysis.resume.file_name,

            'job_description_id': analysis.job_description.id,
            'job_title': analysis.job_description.job_title,
            'company': analysis.job_description.company,

            'ats_score': analysis.ats_score,

            'matched_keywords': analysis.matched_keywords,
            'missing_keywords': analysis.missing_keywords,
            'matching_skills': analysis.matching_skills,
            'recommendations': analysis.recommendations,

            'created_at': analysis.created_at,
        })

    return Response(data, status=status.HTTP_200_OK)    