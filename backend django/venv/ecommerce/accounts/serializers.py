
from django.contrib.auth import get_user_model

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



User = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required= True, write_only = True)
    password2 = serializers.CharField(required = True, write_only = True)

    class Meta:
        model = User
        fields = ("username", "email", "password", "password2")
        extra_kwargs = {'password':{"write_only": True},
                        'password2': {"write_only" : True}
        } 

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        password2 = validated_data.get('password2')

        if password == password2:
            user = User(username = username, email = email)
            user.set_password(password)
            user.save()
            return user

        else:
            return serializers.ValidationError("Password and password2 must be same!!") 






class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        print("USERRRRRR : ................", self.user.id)
        data.update({'username':self.user.username, 'userId':self.user.id,'userEmail': self.user.email, 'userFirstName': self.user.first_name, 'userLastName': self.user.last_name})
        return data




class UserChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required= True, write_only = True)
    password2 = serializers.CharField(required = True, write_only = True)

    class Meta:
        model = User
        fields = ("id","password", "password2")
        extra_kwargs = {'password':{"write_only": True},
                        'password2': {"write_only" : True}
        } 
    
    def update(self, instance, validated_data):
       
        password = validated_data.get('password')
        password2 = validated_data.get('password2')

        if password == password2:         
            instance.set_password(password)
            instance.save()
            return instance

        else:
            return serializers.ValidationError("Password and password2 must be same!!") 
        



       


class UserUpdateSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = User
        fields = ("id","username", "email", "first_name", "last_name")
       
    
    def update(self, instance, validated_data):
       
        instance.username = validated_data.get('username')
        instance.email = validated_data.get('email')  
        instance.first_name = validated_data.get('first_name')
        instance.last_name = validated_data.get('last_name')   
        instance.save()
        return instance

      

























































































































































































































































































































































































































































































































































































































































