from rest_framework import viewsets, filters
from .models import Proveedor
from .serializers import ProveedorSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    search_fields = ["nombre", "telefono", "email"]
    ordering_fields = ["nombre", "created"]
    ordering = ["nombre"]
