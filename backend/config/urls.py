from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.name if hasattr(admin.site, 'name') else admin.site.urls),
    path('api/', include('analyzer.urls')), 
]