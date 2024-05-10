from django.urls import path
from .views import index, register, login, feedback


urlpatterns = [
    path('', index),
    path('auth/login', login),
    path('auth/register', register),
    path('auth/user', index),
    path('auth/logout', index),

    path('feedback/list', feedback),
    path('feedback/add', feedback),
]
