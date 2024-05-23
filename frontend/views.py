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


def shoppingcart(request, *args, **kwargs):
    return render(request, 'frontend/shoppingcart.html')


def main(request, *args, **kwargs):
    return render(request, 'frontend/main.html')


def info(request, *args, **kwargs):
    return render(request, 'frontend/info.html')


def checkout(request, *args, **kwargs):
    return render(request, 'frontend/checkout.html')


def payment(request, *args, **kwargs):
    return render(request, 'frontend/payment.html')


def order_history(request, *args, **kwargs):
    return render(request, 'frontend/order_history.html')
