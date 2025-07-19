""" api\serializer """
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Order  # ✅ Import Order model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'status', 'shop_lat', 'shop_lng',
            'customer_lat', 'customer_lng',
            'picked_up_at', 'delivered_at',
            #'order_items',  # Make sure this field exists or remove it
        ]

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'status', 'shop_lat', 'shop_lng', 'customer_lat', 'customer_lng']