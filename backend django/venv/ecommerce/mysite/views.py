from django.shortcuts import render

from rest_framework import viewsets

from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, ProductDetailSerializer, ReviewSerializer, DiscountSerializer, CartItemSerializer, PaymentSerializer, DeliverySerializer, ProductAllSerializer, UserSerializer, CouponSerializer

from .models import Category, Product, Order,ProductDetail, Review, Discount, Delivery, CartItem, Payment, Coupon

from rest_framework.views import APIView

from rest_framework import status

from rest_framework.response import Response 

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import permissions

from django.contrib.auth import get_user_model

from django.db.models import Q

from django.http.response import JsonResponse

from .pagination import PageNumberWithPageSizePagination

from django.core.paginator import Paginator


User = get_user_model()

# Create your views here.


class CategoryViewset(viewsets.ModelViewSet):   
    authentication_classes= [JWTAuthentication]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
        queryset = Category.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]


class ProductViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
     queryset = Product.objects.all()
     order = self.request.query_params.get("ordering")
     print("ORDERRRRR ?????????????????????????? ", order)
     if order is not None:
         queryset = queryset.order_by(order)
     return queryset

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]


class OrderViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer  
    pagination_class = PageNumberWithPageSizePagination  

    def get_queryset(self):
     queryset = Order.objects.all()
     order = self.request.query_params.get("ordering")
     print("ORDERRRRR ?????????????????????????? ", order)
     if order is not None:
         queryset = queryset.order_by(order)
     return queryset



class ProductDetailViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDetailSerializer
    pagination_class =PageNumberWithPageSizePagination


    def get_queryset(self):
     queryset = ProductDetail.objects.all()
     order = self.request.query_params.get("ordering")
     print("ORDERRRRR ?????????????????????????? ", order)
     if order is not None:
         queryset = queryset.order_by(order)
     return queryset

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]



class ReviewViewset(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = PageNumberWithPageSizePagination


    def get_queryset(self):
     queryset = Review.objects.all()
     order = self.request.query_params.get("ordering")
     print("ORDERRRRR ?????????????????????????? ", order)
     if order is not None:
         queryset = queryset.order_by(order)
     return queryset



class DiscountViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer 
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
     queryset = Discount.objects.all()
     order = self.request.query_params.get("ordering")
     print("ORDERRRRR ?????????????????????????? ", order)
     if order is not None:
         queryset = queryset.order_by(order)
     return queryset

    # def get_permissions(self):
    #     if self.request.method in ['PUT', 'DELETE','POST','PATCH']:
    #         return [permissions.IsAdminUser()]        
    #     return [permissions.IsAuthenticated()]   


class DeliveryViewset(viewsets.ModelViewSet):
     authentication_classes = [JWTAuthentication]
     queryset = Delivery.objects.all()
     serializer_class = DeliverySerializer
     pagination_class = PageNumberWithPageSizePagination


     def get_queryset(self):
        queryset = Delivery.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset




class PaymentViewset(viewsets.ModelViewSet):
    authentication_classes= [JWTAuthentication]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
        queryset = Payment.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset



class CartItemViewset(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
        queryset = CartItem.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset




class CouponViewset(viewsets.ModelViewSet):   
    authentication_classes= [JWTAuthentication]
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
        queryset = Coupon.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset




class ProductAllViewset(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentication]
    queryset = Product.objects.all()
    serializer_class =   ProductAllSerializer  
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
        queryset = Product.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset






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


        page_no = self.request.query_params.get('page', 1)
        data_per_page = self.request.query_params.get('page_size ', 5)

      

        search =  request.data['search']
        categoryId = request.data['categoryId']
        
 
        print("category id : PPPPPPPPPPPPPPPP: ", categoryId , "request.data", request.data)

        if categoryId :
            products = Product.objects.filter(category__exact=categoryId).filter(Q(name__icontains=search) | Q(price__icontains = search)).values()
            
            # return Response({"data": products})
        else:
            products = Product.objects.filter(Q(name__icontains=search) | Q(price__icontains = search)).values()
        
        paginator = Paginator(products , data_per_page)

        no_of_page = paginator.num_pages

        page_obj = paginator.page(page_no)
        


        lst = []
        for p in page_obj:
            print(".......................................................", p["id"])

            productDetails =ProductDetail.objects.filter(product__exact=p["id"]).values()

            data ={
                'id': p["id"],
                'name': p["name"],
                'price':p["price"],               
                'imageUrl': p["imageUrl"],
                'product_details': list(productDetails)
            }    

            print(">>>>>>>>>>>>...............: ", data)
            lst.append(data)
        lst.append(no_of_page)

        print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<...... : ", lst)

        return Response({"data": lst})



class SearchProductDetail(APIView):
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
        return Response({"data": data}, status=status.HTTP_200_OK)     


class UserViewset(viewsets.ModelViewSet):
    authentication_classes=[JWTAuthentication]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = PageNumberWithPageSizePagination

    def get_queryset(self):
        queryset = User.objects.all()
        order = self.request.query_params.get("ordering")
        print("ORDERRRRR ?????????????????????????? ", order)
        if order is not None:
            queryset = queryset.order_by(order)
        return queryset




def pagination(request):

    categoryId = request.GET.get('categoryId')
    page_no = request.GET.get('page')[:-1]
    data_per_page = int(request.GET.get('page_size')) 

    products = Product.objects.filter(category__exact=categoryId)

    p = Paginator(products, data_per_page)
    
    try:
        page_obj = p.get_page(page_no)
    except: 
        page_obj = p.page(1) 

    serialize_data = [c for c in page_obj]
    no_of_page = p.num_pages
    # serialize_data.append(no_of_page) 
 

    print("@@@@@@@@@@@@@@@@@@@@serialized data", page_obj[0].name, "no of pages: ", no_of_page, "ser::: ", serialize_data[0].name)    

    lst = []
    for p in page_obj:

        productDetails =ProductDetail.objects.filter(product__exact=p.id).values()

        data ={
            'id': p.id,
            'name': p.name,
            'price':p.price,
            'category':p.category.id,
            'imageUrl': p.imageUrl,
            'product_details': list(productDetails)
        }    

        print(">>>>>>>>>>>>...............: ", data)
        lst.append(data)
    lst.append(no_of_page)
    
    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<...... : ", lst)
    
    # return Response({"data": lst})
 
    return JsonResponse({"data":lst}, safe=False) 








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
