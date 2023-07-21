from django.shortcuts import render

from rest_framework import viewsets

from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import CategorySerializer, ProductSerializer, OrderSerializer


from .models import Category, Product, Order


# Create your views here.


class CategoryViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer        
