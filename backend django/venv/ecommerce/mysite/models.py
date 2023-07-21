from django.db import models


from django.contrib.auth.models import User



# Create your models here.




class Category(models.Model):
    name = models.CharField(max_length=50)
    imageUrl = models.CharField(max_length=50)


class Product(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=50)
    price = models.CharField(max_length=10)
    imageUrl = models.CharField(max_length=50)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)              # called only first time obj is created
    updated_at = models.DateTimeField(auto_now = True)                # callted every time obj is saved (updated)




