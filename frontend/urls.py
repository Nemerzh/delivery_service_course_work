from django.urls import path
from .views import index, register, login, feedback, profile, shoppingcart, main, info, checkout, payment, order_history, courier


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
    path('payment/<int:order_id>/<int:total_price>', payment),
    path('payment/success/<int:order_id>', payment),
    path('payment/cancel', payment),
    path('contacts', info),
    path('aboutus', info),
    path('deliveryconditions', info),
    path('news', info),
    path('actions', info),
    path('confidentialityrules', info),
    path('info', info),
    path('order_history', order_history),
    path('order_history/detail/<int:order_id>', order_history),
    path('availableorders', courier),
]
