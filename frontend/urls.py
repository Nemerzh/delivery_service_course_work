from django.urls import path
from .views import index, register, login, feedback, profile, shoppingcart, main, info


urlpatterns = [
    path('', index),
    path('shoppingcart', shoppingcart),
    path('auth/login', login),
    path('auth/register', register),
    path('auth/user', profile),
    path('auth/logout', index),
    path('feedback/list', feedback),
    path('feedback/add', feedback),
    path('main', main),
    path('contacts', info),
    path('aboutus', info),
    path('deliveryconditions', info),
    path('news', info),
    path('actions', info),
    path('confidentialityrules', info),
    path('info', info),
]
