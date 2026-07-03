from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, F
from .models import Repuesto, MovimientoStock
from .serializers import (
    RepuestoSerializer,
    RepuestoCreateSerializer,
    IngresoStockSerializer,
    MovimientoStockSerializer,
)
from .services import ingresar_stock


class RepuestoViewSet(viewsets.ModelViewSet):
    queryset = Repuesto.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nombre", "descripcion", "proveedor"]
    ordering_fields = ["nombre", "cantidad_stock", "precio_compra_promedio"]
    ordering = ["nombre"]

    def get_serializer_class(self):
        if self.action == "create":
            return RepuestoCreateSerializer
        return RepuestoSerializer

    @action(detail=True, methods=["post"])
    def ingresar_stock(self, request, pk=None):
        serializer = IngresoStockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            repuesto = ingresar_stock(
                pk,
                serializer.validated_data["cantidad"],
                serializer.validated_data["precio_unitario"],
            )
            output = RepuestoSerializer(repuesto)
            return Response(output.data)
        except Repuesto.DoesNotExist:
            return Response(
                {"error": "Repuesto no encontrado"},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=True, methods=["get"])
    def movimientos(self, request, pk=None):
        movs = MovimientoStock.objects.filter(repuesto_id=pk).select_related("orden_trabajo")
        serializer = MovimientoStockSerializer(movs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def bajo_minimo(self, request):
        qs = self.get_queryset().filter(cantidad_stock__lte=F("punto_reorden"))
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def resumen_stock(self, request):
        qs = self.get_queryset()
        total_valor = sum(r.valor_total_stock() for r in qs)
        total_items = qs.count()
        bajo_minimo = qs.filter(cantidad_stock__lte=F("punto_reorden")).count()
        return Response({
            "total_items": total_items,
            "total_valor_stock": round(total_valor, 2),
            "bajo_minimo": bajo_minimo,
        })
