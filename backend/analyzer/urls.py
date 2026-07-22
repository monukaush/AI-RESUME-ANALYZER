from django.urls import path
from .views import register_user, login_user, get_profile, update_profile, analyze_resume

urlpatterns = [
    path('api/register/', register_user, name='register'),
    path('api/login/', login_user, name='login'),
    path('profile/', get_profile, name='get_profile'),
    path('profile/update/', update_profile, name='update_profile'),
    path('analyze/', analyze_resume, name='analyze_resume'),
]