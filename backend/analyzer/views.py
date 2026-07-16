import os
import json
import pdfplumber
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST'])
def analyze_resume(request):
    # 1. Check if file exists in request
    if 'resume' not in request.FILES:
        return JsonResponse({'error': 'No file uploaded'}, status=400)
    
    uploaded_file = request.FILES['resume']
    extracted_text = ""
    
    try:
        
        with pdfplumber.open(uploaded_file) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
                    
        if not extracted_text.strip():
            return JsonResponse({'error': 'Could not extract text from file'}, status=400)
            
        text_lower = extracted_text.lower()
        
   
        all_keywords = ["React", "Node.js", "Django", "Python", "Docker", "Kubernetes", "AWS", "SQL", "Git", "Redux"]
        missing = []
        for kw in all_keywords:
            if kw.lower() not in text_lower:
                missing.append(kw)
                
        detected_strengths = ["Structured Layout", "Clear Objectives"]
        if any(verb in text_lower for verb in ["spearheaded", "managed", "led", "designed", "implemented"]):
            detected_strengths.append("Action-oriented Verbs")
        if "achieved" in text_lower or "metrics" in text_lower or "%" in text_lower:
            detected_strengths.append("Metrics-Driven Impact")

       
        base_score = 100 - (len(missing) * 6)
        generated_score = max(55, min(98, base_score + random.randint(-3, 3)))

        analysis_data = {
            "score": int(generated_score),
            "missingKeywords": missing[:3] if missing else ["None"],
            "strengths": detected_strengths
        }
        
        return JsonResponse(analysis_data, safe=False)
        
    except Exception as e:
        
        return JsonResponse({'error': f"Processing Error: {str(e)}"}, status=500)

@api_view(['GET'])
def dashboard_stats(request):
    data = {
        "avgScore": 85,
        "checkedCount": 2,
        "creditsRemaining": 48,
        "recentScans": [
            {"id": 1, "name": "Kaushik_Resume_Backend.pdf", "date": "2026-07-14", "score": 85},
            {"id": 2, "name": "Kaushik_Resume_V2.pdf", "date": "2026-07-10", "score": 79}
        ]
    }
    return JsonResponse(data)