from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from django.utils.dateparse import parse_datetime

from .models import Article, Category, Product, ProductDiscovery, Video
from .serializers import (
    ArticleSerializer,
    CategorySerializer,
    ProductDiscoverySerializer,
    ProductSerializer,
    VideoSerializer,
)


class DiscoveryAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'discoveries'

    def post(self, request):
        serializer = ProductDiscoverySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        barcode = str(serializer.validated_data['barcode']).strip()
        payload = dict(serializer.validated_data)

        existing = ProductDiscovery.objects.filter(
            barcode=barcode,
            status=ProductDiscovery.STATUS_PENDING,
        ).first()

        if existing is not None:
            for field, value in payload.items():
                setattr(existing, field, value)
            existing.save()
            response = ProductDiscoverySerializer(existing).data
            return Response(response, status=status.HTTP_200_OK)

        discovery = serializer.save()
        return Response(
            ProductDiscoverySerializer(discovery).data,
            status=status.HTTP_201_CREATED,
        )


class SyncAPIView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'sync'

    def get(self, request):
        since_raw = request.query_params.get('since')
        since = None

        if since_raw:
            since = parse_datetime(since_raw)
            if since is None:
                raise ValidationError(
                    {'since': 'Invalid value. Expected ISO-8601 datetime.'}
                )
            if timezone.is_naive(since):
                since = timezone.make_aware(since, timezone.utc)

        if since is not None:
            products_qs = Product.objects.filter(updated_at__gte=since)
            categories_qs = Category.objects.filter(updated_at__gte=since)
            videos_qs = Video.objects.filter(updated_at__gte=since)
            articles_qs = Article.objects.filter(updated_at__gte=since)
        else:
            products_qs = Product.objects.filter(is_deleted=False)
            categories_qs = Category.objects.all()
            videos_qs = Video.objects.filter(is_deleted=False)
            articles_qs = Article.objects.filter(is_deleted=False)

        products = ProductSerializer(products_qs, many=True).data
        categories = CategorySerializer(categories_qs, many=True).data
        videos = VideoSerializer(videos_qs, many=True).data
        articles = ArticleSerializer(articles_qs, many=True).data

        return Response(
            {
                'server_time': timezone.now().isoformat().replace('+00:00', 'Z'),
                'products': products,
                'categories': categories,
                'videos': videos,
                'articles': articles,
            },
            status=status.HTTP_200_OK,
        )
