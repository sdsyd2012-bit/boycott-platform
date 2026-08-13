from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .admin_api import (
    ApproveDiscoveryView,
    ArticleViewSet,
    CategoryViewSet,
    DashboardStatsView,
    DiscoveryViewSet,
    LoginView,
    ProductViewSet,
    RejectDiscoveryView,
    VideoViewSet,
)
from .views import DiscoveryAPIView, SyncAPIView

app_name = 'catalog'

router = DefaultRouter()
router.register('products', ProductViewSet, basename='admin-product')
router.register('categories', CategoryViewSet, basename='admin-category')
router.register('articles', ArticleViewSet, basename='admin-article')
router.register('videos', VideoViewSet, basename='admin-video')
router.register('discoveries', DiscoveryViewSet, basename='admin-discovery')

urlpatterns = [
    path('sync/', SyncAPIView.as_view(), name='sync'),
    path('discoveries/', DiscoveryAPIView.as_view(), name='discoveries'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('admin/dashboard/', DashboardStatsView.as_view(), name='dashboard'),
    path('admin/discoveries/<int:pk>/approve/', ApproveDiscoveryView.as_view(), name='discovery-approve'),
    path('admin/discoveries/<int:pk>/reject/', RejectDiscoveryView.as_view(), name='discovery-reject'),
    path('admin/', include(router.urls)),
]
