from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, default="", blank=True)
    location = models.CharField(max_length=100, default="", blank=True)
    preferred_role = models.CharField(max_length=100, default="", blank=True)
    experience = models.CharField(max_length=50, default="", blank=True)
    expected_salary = models.CharField(max_length=50, default="", blank=True)
    preferred_location = models.CharField(max_length=100, default="", blank=True)
    skills = models.TextField(default="React, Node.js, Django, Python", blank=True) # comma-separated
    github = models.CharField(max_length=200, default="", blank=True)
    linkedin = models.CharField(max_length=200, default="", blank=True)
    portfolio = models.CharField(max_length=200, default="", blank=True)
    leetcode = models.CharField(max_length=200, default="", blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()
