from django.urls import path
from .views import index, register, login, feedback, profile, shoppingcart, main, checkout, payment


urlpatterns = [
    path('', index),
    path('shoppingcart', shoppingcart),
    path('checkout', checkout),
    path('auth/login', login),
    path('auth/register', register),
    path('auth/user', profile),
    path('auth/logout', index),

    path('feedback/list', feedback),
    path('feedback/add', feedback),
    path('main', main),
    path('payment/<int:order_id>', payment),
    path('payment/success/<int:order_id>', payment),
    path('payment/cancel', payment),
]
