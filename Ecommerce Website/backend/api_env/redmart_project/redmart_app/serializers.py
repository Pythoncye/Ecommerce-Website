from rest_framework import serializers
from django.contrib.auth.models import User
from .models import category,product

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username','email','password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username= validated_data['username'],
            email= validated_data['email'],
            password= validated_data['password']    
        )
        return user

class AdminUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username','email','password','first_name','last_name','is_staff']

    def create(self, validated_data):
        user = User.objects.create_user(
            username= validated_data['username'],
            email= validated_data['email'],
            password= validated_data['password'],
            first_name= validated_data['first_name'],
            last_name= validated_data['last_name'],
            is_staff= validated_data['is_staff'],   
        )
        return user
    
class CategorySerializer(serializers.ModelSerializer):
    category_image = serializers.ImageField(use_url=True)

    class Meta:
        model = category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category_name.name", read_only=True)

    class Meta:
        model = product
        fields = ['id', 'product_name', 'price', 'product_image', 'dsc', 'category']
