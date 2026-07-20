from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

def home(request):
    return HttpResponse("Resume Analyzer Backend is Running")

@api_view(['POST'])
def analyze_resume(request):
    return Response({"message": "Resume analysis endpoint"})

@api_view(['GET'])
def dashboard_stats(request):
    return Response({"message": "Dashboard stats endpoint"})