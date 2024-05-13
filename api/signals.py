from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from .models import Customer, Admin, Courier


@receiver(post_save, sender=User)
def create_courier(sender, instance, created, **kwargs):
    if created and instance.role_id == 5 and instance.is_staff:
        Courier.objects.create(user=instance)


@receiver(post_save, sender=User)
def create_customer(sender, instance, created, **kwargs):
    if created and not instance.is_staff and instance.role != "Courier":
        Customer.objects.create(user=instance)


@receiver(post_save, sender=User)
def create_admin(sender, instance, created, **kwargs):
    if created and instance.is_admin and instance.role != "Courier":
        Admin.objects.create(user=instance)
