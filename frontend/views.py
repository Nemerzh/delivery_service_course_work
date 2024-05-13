from django.shortcuts import render


# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def profile(request, *args, **kwargs):
    return render(request, 'frontend/profile.html')


def feedback(request, *args, **kwargs):
    return render(request, 'frontend/feedback.html')


def register(request, *args, **kwargs):
    return render(request, 'frontend/register.html')


def login(request, *args, **kwargs):
    return render(request, 'frontend/login.html')
