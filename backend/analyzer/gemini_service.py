import json

from django.conf import settings
from google import genai


def analyze_resume_with_gemini(resume_text, jd_text):

    client = genai.Client(
        api_key=settings.GEMINI_API_KEY
    )

    prompt = f"""
You are a professional Applicant Tracking System (ATS) and technical recruiter.

Your task is to evaluate how well the candidate's resume matches the specific job description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

Analyze the resume against the job description using the following criteria:

1. REQUIRED SKILLS AND TECHNOLOGIES
   - Identify important technical skills, programming languages, frameworks,
     databases, tools, and technologies required by the JD.
   - Check whether they are present in the resume.

2. KEYWORD MATCH
   - Match important job-specific keywords between the resume and JD.
   - Consider common variations and abbreviations.
   - Do not mark a skill as matched unless there is reasonable evidence in the resume.

3. EXPERIENCE AND RESPONSIBILITIES
   - Check whether the candidate's projects, internships, or work experience
     demonstrate responsibilities relevant to the JD.

4. EDUCATION
   - Consider education requirements mentioned in the JD when applicable.

5. ATS SCORE
   Calculate a realistic score from 0 to 100 based on:
   - Required technical skills: 45%
   - Experience/projects/responsibility relevance: 25%
   - Important keyword match: 15%
   - Education/qualification relevance: 10%
   - Preferred skills: 5%

Important:
- Do not give a high score simply because the resume is well written.
- Missing critical required skills must significantly reduce the score.
- Give a score based specifically on this JD.
- Do not assume that a skill exists in the resume if it is not explicitly mentioned
  or reasonably demonstrated.
- The score must be an integer between 0 and 100.

Return ONLY valid JSON.

Use exactly this structure:

{
    "ats_score": 0,
    "matched_keywords": [],
    "missing_keywords": [],
    "matching_skills": [],
    "recommendations": []
}

Rules for each field:

- ats_score:
  Integer from 0 to 100.

- matched_keywords:
  Important keywords from the JD that are explicitly present or clearly
  demonstrated in the resume.

- missing_keywords:
  Important required or preferred keywords from the JD that are absent
  from the resume.

- matching_skills:
  Skills from the resume that directly match the requirements of the JD.

- recommendations:
  Give 4 to 6 specific and practical recommendations for improving this
  resume for this particular job.
  Do not give generic advice.

Additional rules:
- Do not invent candidate experience.
- Do not invent skills.
- Do not count unrelated skills as matches.
- Avoid duplicate keywords.
- Keep keyword lists concise and relevant.
- Return ONLY JSON.
- Do not return markdown.
- Do not use ```json.
- Do not include explanations outside the JSON.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    result = response.text.strip()

    if result.startswith("```json"):
        result = result[7:]

    if result.startswith("```"):
        result = result[3:]

    if result.endswith("```"):
        result = result[:-3]

    result = result.strip()

    return json.loads(result)