from django.urls import path
from .views import index, index1

urlpatterns = [
    path('', index),
    path('/', index),
    path('auth/login', index),
    path('auth/register', index),
    path('auth/user', index1),
    path('auth/logout', index),
]
