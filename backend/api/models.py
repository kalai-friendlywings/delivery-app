""" api\models.py """
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

# ✅ Define it at top level (not inside any class)
PICKUP_STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('picked', 'Picked from Shop'),
    ('delivering', 'Out for Delivery'),
    ('delivered', 'Delivered to Customer'),
]

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number']

    def __str__(self):
        return self.email

class Order(models.Model):
    shop_lat = models.FloatField()
    shop_lng = models.FloatField()
    customer_lat = models.FloatField()
    customer_lng = models.FloatField()
    status = models.CharField(
        max_length=15,
        choices=PICKUP_STATUS_CHOICES,
        default='pending'
    )
    picked_up_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.status}"
