from rest_framework.routers import DefaultRouter
from .views import RepuestoViewSet

router = DefaultRouter()
router.register("", RepuestoViewSet, basename="repuesto")
urlpatterns = router.urls
