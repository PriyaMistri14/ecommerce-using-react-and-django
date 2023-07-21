
from django.urls import path,include

from .views import CategoryViewset, ProductViewset, OrderViewset

from rest_framework import routers

router = routers.DefaultRouter()

router.register("category", CategoryViewset, basename="category")
router.register("product", ProductViewset, basename="product")
router.register("order", OrderViewset, basename="order")





urlpatterns  =[
    path("mysite/",include(router.urls))
]
