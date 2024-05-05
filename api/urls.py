from django.urls import path, include
from api.views import *

urlpatterns = [
    path('index/', CategoryView.as_view(), name='index'),
]