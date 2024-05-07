from django.urls import path, include
from api.views import login_view, register_view, CookieTokenRefreshView, logout_view, user, CategoryView, UserView

urlpatterns = [
    path('index/category', CategoryView.as_view(), name='index'),
    path('index/user', UserView.as_view(), name='index'),
    path('login', login_view),
    path('register', register_view),
    path('refresh-token', CookieTokenRefreshView.as_view()),
    path('logout', logout_view),
    path("user", user),
]
