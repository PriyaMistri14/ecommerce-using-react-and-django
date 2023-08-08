from django.shortcuts import render

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserRegisterSerializer, UserChangePasswordSerializer, UserUpdateSerializer


from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.generics import UpdateAPIView

from django.contrib.auth import get_user_model



User = get_user_model()





# Create your views here.


class UserRegisterAPIView(APIView):
    serializer_class = UserRegisterSerializer
    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            response_data = {
                'refresh' : str(refresh),
                'access' : str(refresh.access_token),
                'user' : serializer.data

            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

        




class Logout(APIView):
    def post(self, request):
        
        print("request///////////////////////////", request.data['refresh_token'])

        try:
            refresh_token =  request.data['refresh_token']
            
            token = RefreshToken(refresh_token)
            print("token.../////\\\\\\", token.blacklist())
            token.blacklist()
            print("token.../////\\\\\\", token)
            return Response({"logout":"Log out successfully!!"})
        except Exception as e:
            return Response({"error":"Error occurs while log out!!"})           



class UserChangePasswordAPIView(UpdateAPIView):
    serializer_class=UserChangePasswordSerializer
    queryset = User.objects.all()
    model=User
    
  


class UserUpdateAPIView(UpdateAPIView):
    serializer_class=UserUpdateSerializer
    queryset = User.objects.all()
    model=User  
    


