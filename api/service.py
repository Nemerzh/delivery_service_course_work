from .models import Customer
from django.contrib.auth import get_user_model

User = get_user_model()


def update_user_profile(user_id, phone_number=None, first_name=None, last_name=None, delivery_address=None,
                        password=None):
    try:
        user = User.objects.get(pk=user_id)
        # Оновлюємо дані користувача
        if phone_number:
            user.phone_number = phone_number

        if first_name:
            user.first_name = first_name

        if last_name:
            user.last_name = last_name

        if password:
            user.set_password(password)

        # Зберігаємо зміни у моделі User
        user.save()

        # Отримуємо об'єкт Customer для даного користувача
        customer = Customer.objects.get(user=user)

        # Оновлюємо поле delivery_address, якщо передано відповідний параметр
        if delivery_address:
            customer.delivery_address = delivery_address
            customer.save()

        return True, "Профіль користувача успішно оновлено."
    except User.DoesNotExist:
        return False, "Користувач з вказаним ID не існує."
    except Customer.DoesNotExist:
        return False, "Користувач має відсутній запис у моделі Customer."
