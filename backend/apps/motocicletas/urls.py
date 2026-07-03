from rest_framework.routers import DefaultRouter
from .views import MotocicletaViewSet

router = DefaultRouter()
router.register("", MotocicletaViewSet, basename="motocicleta")
urlpatterns = router.urls
