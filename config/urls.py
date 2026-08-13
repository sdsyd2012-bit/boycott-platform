from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path

urlpatterns = [
    path('', lambda request: redirect('admin/')),  # توجيه إلى لوحة التحكم
    path('admin/', admin.site.urls),
    path('api/v1/', include('catalog.urls')),
]
