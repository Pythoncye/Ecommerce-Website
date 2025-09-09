from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    AdminRegisterView,
    CategoryView,
    ProductListView,
    ProductDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('adminregister/', AdminRegisterView.as_view(), name='adminregister'), 
    path('category/', CategoryView.as_view(), name='category'),
    path('product/<str:category_name>/', ProductListView.as_view(), name='product-list'),
    path('productdetail/<str:category_name>/<str:product_name>/', ProductDetailView.as_view(), name='product-detail'),
]
