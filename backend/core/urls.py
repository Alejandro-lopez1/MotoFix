from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/clientes/", include("apps.clientes.urls")),
    path("api/motocicletas/", include("apps.motocicletas.urls")),
    path("api/ordenes/", include("apps.ordenes.urls")),
    path("api/repuestos/", include("apps.repuestos.urls")),
    path("api/cobros/", include("apps.cobros.urls")),
    path("api/reportes/", include("apps.reportes.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]
