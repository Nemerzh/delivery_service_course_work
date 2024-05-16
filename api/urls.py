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
    path('update_profile/<int:user_id>', UpdateUserProfile.as_view(), name='update_profile'),
    path('customer/<int:user_id>', CustomerView.as_view(), name='customer_list'),
    path('user-ready-dishes/<int:user_id>/', UserReadyDishesListView.as_view(), name='user-ready-dishes'),
    path('update_dish_to_order/<int:dish_to_order_id>', UpdateDishToOrderView.as_view(), name='update_dish_to_order'),

]
