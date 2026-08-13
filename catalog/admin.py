from django.contrib import admin

from .models import Article, Category, Product, Video


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'barcode',
        'name',
        'brand_name',
        'is_boycotted',
        'category',
        'is_deleted',
        'updated_at',
    )
    search_fields = ('barcode', 'name', 'brand_name')
    list_filter = ('is_boycotted', 'category', 'is_deleted')
    list_editable = ('is_boycotted', 'is_deleted')
    list_per_page = 50


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'updated_at', 'created_at')
    search_fields = ('name',)
    list_filter = ('updated_at',)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'embed_url', 'thumbnail_url', 'is_deleted', 'updated_at')
    search_fields = ('title', 'embed_url')
    list_filter = ('is_deleted', 'updated_at')
    list_editable = ('is_deleted',)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'is_deleted', 'updated_at')
    search_fields = ('title', 'slug', 'excerpt')
    list_filter = ('is_deleted', 'updated_at')
    prepopulated_fields = {'slug': ('title',)}
