from django.urls import path, include
from .views import register_user, login_user

urlpatterns = [
    path('api/register/', register_user, name='register'),
    path('api/login/', login_user, name='login'),
    path('', include('analyzer.urls')),
]