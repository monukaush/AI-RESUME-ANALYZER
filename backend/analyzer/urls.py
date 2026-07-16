from django.urls import path
from .views import analyze_resume, dashboard_stats

urlpatterns = [
    path('analyze/', analyze_resume, name='analyze_resume'),
    path('stats/', dashboard_stats, name='dashboard_stats'),
]