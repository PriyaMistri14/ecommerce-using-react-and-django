from django.shortcuts import render

from rest_framework import viewsets

from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, ProductDetailSerializer, ReviewSerializer, DiscountSerializer, CartItemSerializer, PaymentSerializer, DeliverySerializer, ProductAllSerializer

from .models import Category, Product, Order,ProductDetail, Review, Discount, Delivery, CartItem, Payment

from rest_framework.views import APIView

from rest_framework import status

from rest_framework.response import Response 

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import permissions

from django.contrib.auth import get_user_model

from django.db.models import Q

from django.http.response import JsonResponse


User = get_user_model()

# Create your views here.


class CategoryViewset(viewsets.ModelViewSet):   
    authentication_classes= [JWTAuthentication]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]


class ProductViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]


class OrderViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer    



class ProductDetailViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]



class ReviewViewset(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer



class DiscountViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer 

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]   


class DeliveryViewset(viewsets.ModelViewSet):
     authentication_classes = [JWTAuthentication]
     queryset = Delivery.objects.all()
     serializer_class = DeliverySerializer




class PaymentViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer



class CartItemViewset(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer




class ProductAllViewset(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class =   ProductAllSerializer  






class IsSuperUser(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
       
        users = User.objects.filter(is_superuser= True).first()
        print("......................super users:", str(users), "USERNAME !!!", username)
        if str(users) == username:
            print("...........IT IS SUPER USER")
            return Response({"data":True, "message":"Super user found"}, status=status.HTTP_200_OK)

        else:
            print("...........NO SUPER USER>>>>>>>>")
            return Response({"data":False, "message":"No super user found for this credential !"}, status=status.HTTP_200_OK)





class SearchProduct(APIView):
    def post(self, request):
        search =  request.data['search']
        categoryId = request.data['categoryId']
 
        print("category id : PPPPPPPPPPPPPPPP: ", categoryId , "request.data", request.data)

        if categoryId :
            products = Product.objects.filter(category__exact=categoryId).filter(Q(name__icontains=search) | Q(price__icontains = search)).values()
            print("SEARCHED PRODUCTS : ", products)      
            return Response({"data": products})


        products = Product.objects.filter(Q(name__icontains=search) | Q(price__icontains = search)).values()
        print("SEARCHED PRODUCTS : ", products)      
        return Response({"data": products})



class searchProductDetail(APIView):
    def post(self, request):
        color = request.data['color']
        size = request.data['size']
        productId = request.data['productId']
        product = Product.objects.filter(id__exact=productId).values()

        if color and color != "":
            productDetails = ProductDetail.objects.filter(product__exact=productId).filter(available_color__iexact= color).values()
            
        

        elif size and size != "": 
            productDetails = ProductDetail.objects.filter(product__exact=productId).filter(available_size__iexact= size).values()
           


        else:
            productDetails =  ProductDetail.objects.filter(product__exact=productId).values()
           

        print("Product : ", product[0])
        data ={
            'id': productId,
            'name': product[0]['name'],
            'price':product[0]['price'],
            'category':product[0]['category_id'],
            'imageUrl': product[0]['imageUrl'],
            'product_details': productDetails
        }     

        print("DATATA : ", data)  
        return Response({"data": data})     


# class CustomerViewset(viewsets.ModelViewSet):
#      authentication_classes= [JWTAuthentication]
#      queryset = Customer.objects.all()
#      serializer_class = CustomerRegisterSerializer



# class CustomerLoginView(APIView):
#     def post(self, request):
#         try:
#             email = request.data['email']
#             password = request.data['password']
#             customer = Customer.objects.filter(email= email, password= password).first()
#             if customer:
                
#                 # refresh = RefreshToken.for_user(customer)
#                 response = {
#                     # 'refresh':str(refresh),
#                     # 'access' : str(refresh.access_token),
#                     'user': customer.fname

#                 }
#                 print("RESPONSEE OBJ : ", response)

#                 return Response(response, status=status.HTTP_200_OK)
            
#             else:
#                 return Response({'data':"", "message":"No active user found for given credential!"}, status=status.HTTP_200_OK)

#         except Exception as e:
#             print("Error while customer login:  ", e)
#             return Response({'data': "", 'message':"Error while customer login!! "}, status=status.HTTP_200_OK)    
