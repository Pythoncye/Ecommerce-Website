from django.db import models


class category(models.Model):
    name = models.CharField(max_length=100)
    category_image = models.ImageField(upload_to='image/')
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class meta:
        verbose_name = 'category'
        verbose_name_plural  = 'categories'

class product(models.Model):
    category_name = models.ForeignKey(category, on_delete=models.CASCADE,related_name='categories')
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8,decimal_places=2)
    stock = models.IntegerField(default=0)
    product_image = models.ImageField(upload_to='image/')
    dsc = models.TextField()
    created_at = models.DateTimeField(auto_now=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name
    
    class meta:
        verbose_name = 'product'
        verbose_name_plural  = 'products'
