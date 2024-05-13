from django.urls import path, include
from api.views import *

urlpatterns = [
    path('category', CategoryView.as_view(), name='index'),
    path('index/user', UserView.as_view(), name='index'),

    path('feedback/last', LastFiveFeedbacksView.as_view(), name='last-five-feedbacks'),
    path('feedback', FeedbackView.as_view(), name='feedbacks'),

    path('login', login_view),
    path('register', register_view),
    path('refresh-token', CookieTokenRefreshView.as_view()),
    path('logout', logout_view),
    path("user", user),
]
