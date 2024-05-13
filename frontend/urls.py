from django.urls import path
from .views import index, register, login, feedback, profile


urlpatterns = [
    path('', index),
    path('auth/login', login),
    path('auth/register', register),
    path('auth/user', profile),
    path('auth/logout', index),

    path('feedback/list', feedback),
    path('feedback/add', feedback),
]
