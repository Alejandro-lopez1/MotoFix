from rest_framework import viewsets, mixins, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import OrdenTrabajo, NotaOT, ESTADOS_ACTIVOS
from .serializers import (
    OrdenTrabajoListSerializer,
    OrdenTrabajoDetailSerializer,
    OrdenTrabajoCreateSerializer,
    OrdenTrabajoEstadoSerializer,
    NotaOTSerializer,
)
from .services import crear_orden_trabajo, cambiar_estado_ot
from apps.repuestos.serializers import OTRepuestoSerializer, MovimientoStockSerializer
from apps.repuestos.models import OTRepuesto, MovimientoStock
from apps.cobros.serializers import CobroSerializer
from apps.cobros.models import Cobro


class OrdenTrabajoViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          mixins.ListModelMixin,
                          viewsets.GenericViewSet):
    queryset = OrdenTrabajo.objects.prefetch_related("notas", "historial_estados").all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["dominio", "nombre_cliente", "telefono_cliente"]
    ordering_fields = ["fecha_creacion", "estado"]
    ordering = ["-fecha_creacion"]

    def get_serializer_class(self):
        if self.action == "create":
            return OrdenTrabajoCreateSerializer
        elif self.action in ["update", "partial_update"]:
            return OrdenTrabajoCreateSerializer
        elif self.action in ["list", "historial_motocicleta", "historial_cliente"]:
            return OrdenTrabajoListSerializer
        return OrdenTrabajoDetailSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        activas = self.request.query_params.get("activas")
        if activas and activas.lower() == "true":
            qs = qs.filter(estado__in=ESTADOS_ACTIVOS)
        return qs

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ot = crear_orden_trabajo(serializer.validated_data)
        output = OrdenTrabajoDetailSerializer(ot, context=self.get_serializer_context())
        return Response(output.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["patch"])
    def estado(self, request, pk=None):
        ot = self.get_object()
        serializer = OrdenTrabajoEstadoSerializer(data=request.data, instance=ot)
        serializer.is_valid(raise_exception=True)
        nuevo_estado = serializer.validated_data["estado"]
        ot = cambiar_estado_ot(ot, nuevo_estado)
        response_data = {
            "id": ot.id,
            "estado": ot.estado,
            "saldo_pendiente": ot.saldo_pendiente,
            "warning": None,
        }
        if nuevo_estado == "Entregada" and ot.saldo_pendiente > 0:
            response_data["warning"] = f"Esta OT tiene un saldo pendiente de ${ot.saldo_pendiente}"
        return Response(response_data)

    @action(detail=True, methods=["get"])
    def repuestos(self, request, pk=None):
        ot = self.get_object()
        items = OTRepuesto.objects.filter(orden_trabajo=ot).select_related("repuesto")
        serializer = OTRepuestoSerializer(items, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def agregar_repuesto(self, request, pk=None):
        from apps.repuestos.services import asociar_repuesto_a_ot
        ot = self.get_object()
        repuesto_id = request.data.get("repuesto_id")
        cantidad = request.data.get("cantidad", 1)
        try:
            item = asociar_repuesto_a_ot(ot, repuesto_id, cantidad)
            serializer = OTRepuestoSerializer(item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_409_CONFLICT)

    @action(detail=True, methods=["get"])
    def cobros(self, request, pk=None):
        ot = self.get_object()
        cobros = Cobro.objects.filter(orden_trabajo=ot)
        serializer = CobroSerializer(cobros, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def registrar_cobro(self, request, pk=None):
        from apps.cobros.services import registrar_cobro
        ot = self.get_object()
        monto_cobrado = request.data.get("monto_cobrado")
        forma_pago = request.data.get("forma_pago")
        try:
            cobro = registrar_cobro(ot, monto_cobrado, forma_pago)
            serializer = CobroSerializer(cobro)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get"])
    def notas(self, request, pk=None):
        ot = self.get_object()
        notas = ot.notas.all()
        serializer = NotaOTSerializer(notas, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def agregar_nota(self, request, pk=None):
        ot = self.get_object()
        serializer = NotaOTSerializer(data={"orden_trabajo": ot.id, "texto": request.data.get("texto", "")})
        serializer.is_valid(raise_exception=True)
        serializer.save(orden_trabajo=ot)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class NotaOTViewSet(mixins.CreateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = NotaOT.objects.all()
    serializer_class = NotaOTSerializer

    def perform_destroy(self, instance):
        if instance.orden_trabajo.estado == "Entregada":
            raise serializers.ValidationError("No se pueden eliminar notas de OT entregadas")
        instance.delete()
