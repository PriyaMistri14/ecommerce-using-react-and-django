from django.db import models


from django.contrib.auth.models import User

from datetime import datetime

from django.utils.timezone import now



# Create your models here.


# class Customer(models.Model):
#     fname = models.CharField(max_length=50)
#     lname = models.CharField(max_length=50)
#     surname = models.CharField(max_length=50)
#     dob = models.DateField()
#     email = models.EmailField()
#     password = models.CharField(max_length=10)
#     city = models.CharField(max_length=20)
#     state = models.CharField(max_length=20)
#     pincode = models.CharField(max_length=10)
#     address = models.TextField()
#     created_at = models.DateTimeField(default=now)              # called only first time obj is created
#     updated_at = models.DateTimeField(auto_now = True) 






class Category(models.Model):
    name = models.CharField(max_length=50)
    imageUrl = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=now)              # called only first time obj is created
    updated_at = models.DateTimeField(auto_now = True) 


class Product(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=50)
    price = models.FloatField()
    imageUrl = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=now)              # called only first time obj is created
    updated_at = models.DateTimeField(auto_now = True) 

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    product_detail = models.ForeignKey('ProductDetail', on_delete=models.CASCADE, default=0, related_name='orders')
    quantity = models.IntegerField(default=1)
    status = models.CharField(max_length=50, default='Pending')  #Pending, Success, Cancelled
    total_amount = models.FloatField(default=0)
    coupon = models.ForeignKey('Coupon', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(default=now)              #  auto_now_all is called only first time obj is created
    updated_at = models.DateTimeField(auto_now = True)                # auto_now is callted every time obj is saved (updated)




class ProductDetail(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='product_details')
    available_quantity = models.IntegerField()
    available_size = models.CharField(max_length=10)   # XS, S, M, L, XL , XXL , XXXL
    available_color = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=now)            
    updated_at = models.DateTimeField(auto_now = True) 




class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product_detail = models.ForeignKey('ProductDetail', on_delete=models.CASCADE, related_name='cart_items', default="")
    quantity = models.IntegerField()
    created_at = models.DateTimeField(default=now)             
    updated_at = models.DateTimeField(auto_now = True) 




class Discount(models.Model):
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='discounts')
    percentage = models.FloatField()
    minimum_order = models.IntegerField()
    isActive = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=now)              
    updated_at = models.DateTimeField(auto_now = True) 




class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()
    description = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=now)           
    updated_at = models.DateTimeField(auto_now = True) 


class Payment(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='payments')
    discount = models.ForeignKey('Discount', on_delete=models.CASCADE, related_name='payments')
    payment_method = models.CharField(max_length=50)
    card_account_upi_no = models.CharField(max_length=50)
    delivery_charge = models.FloatField()
    total_amount = models.FloatField()
    created_at = models.DateTimeField(default=now)              # called only first time obj is created
    updated_at = models.DateTimeField(auto_now = True) 




class Delivery(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='deliveries')
    isDelivered = models.BooleanField(default=False) 
    created_at = models.DateTimeField(default=now)              # called only first time obj is created
    updated_at = models.DateTimeField(auto_now = True)    




class Coupon(models.Model):
    coupon_code = models.CharField(max_length=20)
    is_expired = models.BooleanField(default=False)
    discount_price = models.IntegerField(default=50)
    minimum_amount = models.IntegerField(default=500)
    created_at = models.DateTimeField(default=now)             
    updated_at = models.DateTimeField(auto_now = True) 
 




















