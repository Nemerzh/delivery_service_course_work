from django.db import models


class Category(models.Model):
    category_name = models.CharField(max_length=255)

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
    type = models.CharField(max_length=255)


class DishToOrder(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    count = models.IntegerField()


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
