
from django.urls import path,include

from .views import CategoryViewset, ProductViewset, OrderViewset,  ProductDetailViewset, DiscountViewset, DeliveryViewset, PaymentViewset, CartItemViewset, ReviewViewset, IsSuperUser, ProductAllViewset, SearchProduct, searchProductDetail

from rest_framework import routers

router = routers.DefaultRouter()

router.register("category", CategoryViewset, basename="category")
router.register("product", ProductViewset, basename="product")
router.register("order", OrderViewset, basename="order")
router.register("productDetail", ProductDetailViewset, basename="productDetail")
router.register("discount", DiscountViewset, basename="discount")
router.register("delivery", DeliveryViewset, basename="delivery")
router.register("payment", PaymentViewset, basename="payment")
router.register("review", ReviewViewset, basename="review")
router.register("cartItem", CartItemViewset, basename="cartItem")
router.register("productAll", ProductAllViewset, basename="productAll")





urlpatterns  =[
    path("mysite/",include(router.urls)), 
    path("mysite/isSuperUser/", IsSuperUser.as_view(), name='isSuperUser' ),
    path("mysite/searchProduct/", SearchProduct.as_view(), name='searchProduct'),
    path("mysite/searchProductDetail/", searchProductDetail.as_view(), name='searchProductDetail' ) 
]
