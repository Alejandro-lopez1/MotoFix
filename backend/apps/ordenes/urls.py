from rest_framework.routers import DefaultRouter
from .views import OrdenTrabajoViewSet

router = DefaultRouter()
router.register("", OrdenTrabajoViewSet, basename="orden-trabajo")
urlpatterns = router.urls
