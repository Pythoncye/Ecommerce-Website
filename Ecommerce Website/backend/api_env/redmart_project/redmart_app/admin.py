from django.contrib import admin
from .models import category,product

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'created_at')
    readonly_fields = ('created_at',)

admin.site.register(category)
admin.site.register(product,ProductAdmin)