
from django.urls import path

from .views import UserRegisterAPIView, CustomTokenObtainPairView, Logout, UserChangePasswordAPIView, UserUpdateAPIView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path("register/", UserRegisterAPIView.as_view(), name="register" ),
    path("custom/", TokenObtainPairView.as_view(), name="custom"),
    path("refresh/", TokenRefreshView.as_view(), name= "refresh"),
    path("login/", CustomTokenObtainPairView.as_view(), name='login'),
    # path("api/token/",CustomTokenObtainPairView.as_view(), name='login1' ),
    path("logout/",Logout.as_view(), name='logout' ),   
    path("changePassword/<pk>",UserChangePasswordAPIView.as_view(), name='changePassword'),
    path("updateProfile/<pk>",UserUpdateAPIView.as_view(), name='updateProfile')
]
