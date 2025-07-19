""" api/urls.py """
from django.urls import path
from .views import RegisterView
from . import views  # ✅ Import views module
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('orders/', views.order_list_view),
    
]
