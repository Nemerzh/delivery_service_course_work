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
    path('delete-order/<int:user_id>', DeleteOrderAPIView.as_view(), name='delete_order'),
    path('update_confirm_order/<int:order_id>', ConfirmUpdateOrder.as_view(), name='update_confirm_order'),
    path('payments/create_payment/', create_payment, name='create_payment'),
    path('payments/update_order/', update_order_status, name='update-order-status'),
    path('categorydish/<int:category_id>', CategoryDishAPIView.as_view(), name='category-dish'),
    path("dish_to_order", GetDishToOrderAPIView.as_view(), name='dish-to-order'),
    path('dish_to_order_id/<int:id>', UpdateCountDishToOrderAPIView.as_view(), name='dish_to_order_id'),
    path("order/<int:user_id>", OrderAPIView.as_view(), name='order'),
    path('order/detail/<int:pk>', OrderDetailAPIView.as_view(), name='order-detail'),
    path("order", OrderAPIView.as_view(), name='order'),
    path("courier", CourierAPIView.as_view(), name='courier'),
    path("delivery/<int:courier_id>/<str:delivery_status>/", DeliveryAPIView.as_view(), name='delivery'),
    path("delivery/<int:pk>", UpdateDeliveryAPIView.as_view(), name='update_delivery_detail'),
    path("getuser", UserAPIView.as_view(), name='user'),
]
