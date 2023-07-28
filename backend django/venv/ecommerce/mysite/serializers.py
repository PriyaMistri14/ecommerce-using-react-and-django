from rest_framework import serializers

from .models import Category, Product, Order,ProductDetail, Discount, Review, Delivery, Payment, CartItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'



class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields= '__all__'



class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model= Review
        fields = '__all__'



class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'




class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'




class ProductAllSerializer(serializers.ModelSerializer):
    product_details= ProductDetailSerializer(many=True) 
    class Meta:
        model = Product
        fields= '__all__'











# class CustomerRegisterSerializer(serializers.ModelSerializer):
#     password2 = serializers.CharField(required=True, write_only = True)
#     class Meta:
#         model = Customer
#         fields = '__all__'
#         extra_kwargs = {'password2':{'write_only': True}}


#     def create(self, validated_data):

#         fname = validated_data.get('fname')
#         lname = validated_data.get('lname')
#         surname = validated_data.get('surname')
#         dob = validated_data.get('dob')
#         email = validated_data.get('email')
#         password = validated_data.get('password')
#         password2 = validated_data.get('password2')
#         city = validated_data.get('city')
#         state = validated_data.get('state')
#         address = validated_data.get('address')
#         pincode = validated_data.get('pincode')

#         if password == password2:
#             customer = Customer(fname=fname, lname=lname, surname = surname, dob = dob, email= email, city= city, state=state, address = address, pincode = pincode, password= password)
           
#             customer.save()
#             print("CUSTOMER :: ", customer)
#             return customer

#         return serializers.ValidationError("Password and password2 not match!!")    







