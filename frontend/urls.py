from django.urls import path
from .views import index, register, login

urlpatterns = [
    path('', index),
    path('auth/login', login),
    path('auth/register', register),
    path('auth/user', index),
    path('auth/logout', index),
]
