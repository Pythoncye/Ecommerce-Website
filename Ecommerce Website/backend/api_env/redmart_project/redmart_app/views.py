from django.shortcuts import render

from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status,generics
from .serializers import UserSerializer,AdminUserSerializer,CategorySerializer,ProductSerializer
from .models import category,product
from .permissions import IsSuperUser

class RegisterView(APIView):
    def post(self,request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({"refresh": str(refresh),"access": str(refresh.access_token),},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class AdminRegisterView(APIView):
    permission_classes = [IsSuperUser]
    def post(self,request):
        serializer = AdminUserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self,request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username,password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({"refresh": str(refresh),"access": str(refresh.access_token),"user_id":user.id,"superuser":user.is_superuser},status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invalid Credentials'},status=status.HTTP_401_UNAUTHORIZED)
        
class CategoryView(generics.ListAPIView):
    queryset = category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(APIView):
    def get(self, request, category_name, *args, **kwargs):
        try:
            cat = category.objects.get(name=category_name)
        except category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        products = product.objects.filter(category_name=cat)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    def get(self, request, category_name, product_name, *args, **kwargs):
        try:
            cat = category.objects.get(name=category_name)
        except category.DoesNotExist:
            return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            prod = product.objects.get(category_name=cat, product_name=product_name)
        except product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(prod)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

