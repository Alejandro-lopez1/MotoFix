from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.permissions import AllowAny
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

@require_http_methods(["GET", "HEAD"])
def health_check(request):
    """Simple health check endpoint for load balancer."""
    return JsonResponse({"status": "ok", "message": "Backend is running"})

urlpatterns = [
    path("health/", health_check, name="health_check"),
    path("admin/", admin.site.urls),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/clientes/", include("apps.clientes.urls")),
    path("api/motocicletas/", include("apps.motocicletas.urls")),
    path("api/ordenes/", include("apps.ordenes.urls")),
    path("api/repuestos/", include("apps.repuestos.urls")),
    path("api/cobros/", include("apps.cobros.urls")),
    path("api/reportes/", include("apps.reportes.urls")),
    path("api/proveedores/", include("apps.proveedores.urls")),
    path("api/schema/", SpectacularAPIView.as_view(permission_classes=[AllowAny]), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema", permission_classes=[AllowAny]), name="swagger-ui"),
]
