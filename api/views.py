from django.http import JsonResponse
from django.shortcuts import render
from paypalrestsdk import Payment, configure
import json
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from api.serializers import CategoriesSerializer, UserSerializer, FeedbackSerializer, DeliverySerializer, \
    CourierSerializer

from api.models import Category, User, Feedback, Delivery, Courier

from django.contrib.auth import authenticate
from django.conf import settings
from django.middleware import csrf
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, \
    permissions as rest_permissions
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, \
    exceptions as jwt_exceptions
from api import serializers, models
from .service import update_user_profile, update_order
from django.utils import timezone
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from django.views.generic import ListView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import CategoriesSerializer, UserSerializer, FeedbackSerializer, CustomerSerializer, \
    DishToOrderSerializer, DishSerializer, OrderSerializer, GetDishToOrderSerializer
from rest_framework.views import APIView
from api.models import Category, User, Feedback, Customer, DishToOrder, Order, Dish
from rest_framework.generics import RetrieveUpdateAPIView


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_token)
    }


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def login_view(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"]
    print(email)
    password = serializer.validated_data["password"]
    print(password)

    user = authenticate(email=email, password=password)
    print(user)

    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=tokens["refresh_token"],
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.data = tokens
        res["X-CSRFToken"] = csrf.get_token(request)
        return res
    raise rest_exceptions.AuthenticationFailed(
        "Email or Password is incorrect!")


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def register_view(request):
    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()

    if user is not None:
        return response.Response("Registered!")
    return rest_exceptions.AuthenticationFailed("Invalid credentials!")


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logout_view(request):
    try:
        refreshToken = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        res["X-CSRFToken"] = None

        return res
    except:
        raise rest_exceptions.ParseError("Invalid token")


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user = models.User.objects.get(id=request.user.id)
    except models.User.DoesNotExist:
        return response.Response(status=404)

    serializer = serializers.UserSerializer(user)
    return response.Response(serializer.data)


class CategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoriesSerializer


class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated & permissions.IsAdminUser]


class FeedbackView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class LastFiveFeedbacksView(generics.ListAPIView):
    serializer_class = FeedbackSerializer

    def get_queryset(self):
        # Получаем параметр max_id из запроса
        max_id = self.request.query_params.get('max_id')

        if max_id is not None:
            # Фильтруем комментарии, id которых меньше max_id
            queryset = Feedback.objects.filter(id__lt=max_id).order_by('-id')[:1]
        else:
            # Загружаем последние комментарии по id, если max_id не указан
            queryset = Feedback.objects.order_by('-id')[:1]

        return queryset


class UpdateUserProfile(APIView):
    def put(self, request, user_id):
        phone_number = request.data.get('phone_number')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        delivery_address = request.data.get('delivery_address')
        password = request.data.get('password')
        success, message = update_user_profile(user_id, phone_number, first_name, last_name, delivery_address, password)

        if success:
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_404_NOT_FOUND)


class CustomerView(generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'user_id'


class UserReadyDishesListView(generics.ListAPIView):
    serializer_class = DishToOrderSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        customer = Customer.objects.filter(user_id=user_id).first()
        queryset = DishToOrder.objects.filter(order__user_id=customer.id, order__order_status="ready").order_by('id')
        return queryset


class UpdateDishToOrderView(APIView):
    def post(self, request, dish_to_order_id):
        try:
            dish_to_order = DishToOrder.objects.get(id=dish_to_order_id)
        except DishToOrder.DoesNotExist:
            return Response({'error': 'DishToOrder not found'}, status=status.HTTP_404_NOT_FOUND)

        add_or_minus = request.data.get('add_or_minus')
        if add_or_minus == "add":
            dish_to_order.count += 1
        elif add_or_minus == "minus":
            dish_to_order.count -= 1
            if dish_to_order.count <= 0:
                dish_to_order.delete()
                return Response({'success': 'DishToOrder deleted successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Action not found'}, status=status.HTTP_404_NOT_FOUND)

        dish_to_order.save()
        return Response({'success': 'DishToOrder updated successfully'}, status=status.HTTP_200_OK)


class DeleteOrderAPIView(APIView):
    def delete(self, request, user_id, format=None):
        customer = Customer.objects.filter(user_id=user_id).first()
        orders = Order.objects.filter(user_id=customer.id, order_status='ready')

        if orders.exists():
            for order in orders:
                order.delete()
            return Response({"message": "Orders with status 'ready' deleted successfully."},
                            status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "No orders found with status 'ready' for the specified user."},
                            status=status.HTTP_404_NOT_FOUND)


class ConfirmUpdateOrder(APIView):
    def put(self, request, order_id):
        total_price = request.data.get('totalPrice')
        address = request.data.get('address')
        selected_date = request.data.get('selectedDate')
        selected_time = request.data.get('selectedTime')
        number_people = request.data.get('numberPeople')
        note = request.data.get('note')

        success, message = update_order(order_id, total_price, address, selected_date, selected_time,
                                        number_people,
                                        note)

        if success:
            return Response({"message": message}, status=status.HTTP_200_OK)
        else:
            return Response({"error": message}, status=status.HTTP_404_NOT_FOUND)


# Налаштування PayPal SDK
configure({
    'mode': 'sandbox',  # Використовуйте 'live' для продакшн середовища
    'client_id': settings.PAYPAL_CLIENT_ID,
    'client_secret': settings.PAYPAL_CLIENT_SECRET
})


@rest_decorators.api_view(['POST'])
def create_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        order_id = data.get('order_id')

        # Отримуємо ордер з бази даних
        order = get_object_or_404(Order, id=order_id)

        if order.order_status != 'ready':
            return JsonResponse({'error': 'Order is not ready for payment'}, status=400)

        payment = Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8000/payment/success/" + str(order.id),
                "cancel_url": "http://localhost:8000/payment/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": f"Order {order.id}",
                        "sku": str(order.id),
                        "price": str(order.price),
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "total": str(order.price),
                    "currency": "USD"
                },
                "description": order.comment or f"Payment for Order {order.id}"
            }]
        })

        if payment.create():
            approval_url = next((link.href for link in payment.links if link.rel == 'approval_url'), None)
            return JsonResponse({'approval_url': approval_url})
        else:
            return JsonResponse({'error': payment.error}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@rest_decorators.api_view(['POST'])
def update_order_status(request):
    data = request.data
    order_id = data.get('order_id')

    # Отримуємо ордер з бази даних
    order = get_object_or_404(Order, id=order_id)

    # Перевіряємо поточний статус ордера
    if order.order_status == 'ready':
        # Оновлюємо статус і час завершення ордера
        order.order_status = 'paid'
        order.end_time = timezone.now()
        order.save()
        return Response({'success': True})
    else:
        return Response({'error': 'Order is not in ready status'}, status=400)



class CategoryDishAPIView(APIView):
    def get(self, request, category_id):
        try:
            queryset = Dish.objects.filter(category_id=category_id)
            serializer = DishSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dish.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class DishToOrderAPIView(generics.ListCreateAPIView):
    queryset = DishToOrder.objects.all()
    serializer_class = DishToOrderSerializer


class GetDishToOrderAPIView(generics.ListCreateAPIView):
    queryset = DishToOrder.objects.all()
    serializer_class = GetDishToOrderSerializer

    def get(self, request, *args, **kwargs):
        order_id = request.query_params.get('order_id')
        dish_id = request.query_params.get('dish_id')
        if order_id and dish_id:
            dish_to_order = DishToOrder.objects.filter(order_id=order_id, dish_id=dish_id).first()
            if dish_to_order:
                serializer = self.get_serializer(dish_to_order)
                return Response(serializer.data)
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return super().get(request, *args, **kwargs)


class OrderAPIView(APIView):
    def get(self, request, user_id):
        try:
            customer = Customer.objects.filter(user_id=user_id).first()
            queryset = Order.objects.filter(user=customer).exclude(order_status='ready')
            serializer = OrderSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Dish.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class UpdateCountDishToOrderAPIView(generics.UpdateAPIView):
    queryset = DishToOrder.objects.all()
    serializer_class = DishToOrderSerializer
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.count = request.data.get("count", instance.count)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class DeliveryAPIView(APIView):
    def get(self, request, courier_id, delivery_status):
        if courier_id and delivery_status:
            deliveries = Delivery.objects.filter(courier_id=courier_id, delivery_status=delivery_status)
            serializer = DeliverySerializer(deliveries, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class UpdateDeliveryAPIView(RetrieveUpdateAPIView):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CourierAPIView(generics.ListCreateAPIView):
    queryset = Courier.objects.all()
    serializer_class = CourierSerializer


class UserAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
