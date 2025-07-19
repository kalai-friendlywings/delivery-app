from math import radians, cos, sin, sqrt, atan2
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from .serializers import RegisterSerializer, OrderDetailSerializer, OrderListSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# ✅ Haversine formula to calculate distance in KM
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in kilometers
    d_lat = radians(lat2 - lat1)
    d_lon = radians(lon2 - lon1)
    a = sin(d_lat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(d_lon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return round(R * c, 2)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

@api_view(['GET'])
def order_list_view(request):
    orders = Order.objects.all()
    serializer = OrderListSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def order_detail_view(request, order_id):
    try:
        order = Order.objects.get(id=order_id)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

    try:
        user_lat = float(request.query_params.get('lat', 0))
        user_lng = float(request.query_params.get('lng', 0))
    except:
        return Response({'error': 'Invalid location'}, status=400)

    shop_distance = haversine(user_lat, user_lng, order.shop_lat, order.shop_lng)
    delivery_distance = haversine(order.shop_lat, order.shop_lng, order.customer_lat, order.customer_lng)

    return Response({
        "id": order.id,
        "status": order.status,
        "shop_distance_km": shop_distance,
        "customer_distance_km": delivery_distance,
        "eta": "15-25 min"
    })
