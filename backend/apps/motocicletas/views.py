from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Motocicleta
from .serializers import MotocicletaSerializer
from apps.ordenes.models import OrdenTrabajo
from apps.ordenes.serializers import OrdenTrabajoListSerializer

class MotocicletaViewSet(viewsets.ModelViewSet):
    queryset = Motocicleta.objects.select_related("cliente").all()
    serializer_class = MotocicletaSerializer
    search_fields = ["dominio", "marca", "modelo"]
    ordering_fields = ["dominio", "created"]

    @action(detail=False, methods=["get"], url_path="buscar/(?P<dominio>[^/.]+)")
    def buscar_por_dominio(self, request, dominio=None):
        try:
            moto = self.get_queryset().get(dominio__iexact=dominio)
            serializer = self.get_serializer(moto)
            return Response(serializer.data)
        except Motocicleta.DoesNotExist:
            return Response(None, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"])
    def historial(self, request, pk=None):
        moto = self.get_object()
        ordenes = OrdenTrabajo.objects.filter(motocicleta=moto).order_by("-fecha_creacion")
        serializer = OrdenTrabajoListSerializer(ordenes, many=True)
        return Response(serializer.data)
