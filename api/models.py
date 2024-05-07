from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager, AbstractBaseUser
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, role_id=None, **kwargs):
        if not email:
            raise ValueError("Email is required")

        user = self.model(
            email=self.normalize_email(email),
            role_id=role_id
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **kwargs):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            role_id=2
        )

        user.first_name = kwargs.get('first_name')
        user.last_name = kwargs.get('last_name')
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.role_id = 2
        user.save(using=self._db)
        return


class Category(models.Model):
    category_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.category_name


class Dish(models.Model):
    product_name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    price = models.FloatField()
    discount = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    mass = models.FloatField()
    calories = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    carbohydrate = models.FloatField()
    image_url = models.URLField()
    available = models.BooleanField()

    def __str__(self):
        return self.product_name


class Order(models.Model):
    user = models.ForeignKey('Customer', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    order_status = models.CharField(max_length=255)
    price = models.FloatField()
    comment = models.CharField(max_length=500)


class Delivery(models.Model):
    current_order = models.ForeignKey(Order, on_delete=models.CASCADE)
    courier = models.ForeignKey('Courier', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    delivery_address = models.CharField(max_length=500)
    delivery_status = models.CharField(max_length=255)


class Feedback(models.Model):
    user = models.ForeignKey('Customer', on_delete=models.CASCADE)
    review_text = models.CharField(max_length=1000)
    rating = models.FloatField()
    review_date = models.DateTimeField()


class Courier(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE)


class Customer(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    delivery_address = models.CharField(max_length=500)


class Admin(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE)


class UserRole(models.Model):
    type = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.type


class DishToOrder(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    count = models.IntegerField()


class User(AbstractBaseUser):
    phone_number = PhoneNumberField(unique=True)
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE, blank=True)
    email = models.EmailField(null=False, blank=False, unique=True)
    first_name = models.CharField(max_length=50, blank=False, null=False, default='Default first name')
    last_name = models.CharField(max_length=50, blank=False, null=False, default='Default last name')
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

