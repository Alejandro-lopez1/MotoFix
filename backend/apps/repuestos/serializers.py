from decimal import Decimal
from rest_framework import serializers
from .models import Repuesto, OTRepuesto, MovimientoStock


class RepuestoSerializer(serializers.ModelSerializer):
    esta_bajo_minimo = serializers.SerializerMethodField()
    valor_total = serializers.SerializerMethodField()

    class Meta:
        model = Repuesto
        fields = [
            "id", "nombre", "descripcion", "proveedor",
            "precio_compra_promedio", "cantidad_stock",
            "punto_reorden", "esta_bajo_minimo", "valor_total",
            "created", "updated",
        ]

    def get_esta_bajo_minimo(self, obj):
        return obj.esta_bajo_minimo()

    def get_valor_total(self, obj):
        return obj.valor_total_stock()

    def validate_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre del repuesto es obligatorio")
        return value


class RepuestoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repuesto
        fields = [
            "nombre", "descripcion", "proveedor",
            "precio_compra_promedio", "cantidad_stock", "punto_reorden",
        ]


class IngresoStockSerializer(serializers.Serializer):
    cantidad = serializers.IntegerField(min_value=Decimal("1"))
    precio_unitario = serializers.DecimalField(max_digits=10, decimal_places=2, min_value=Decimal("0"))


class OTRepuestoSerializer(serializers.ModelSerializer):
    repuesto_nombre = serializers.CharField(source="repuesto.nombre", read_only=True)
    repuesto_stock = serializers.IntegerField(source="repuesto.cantidad_stock", read_only=True)

    class Meta:
        model = OTRepuesto
        fields = [
            "id", "orden_trabajo", "repuesto", "repuesto_nombre",
            "repuesto_stock", "cantidad", "precio_unitario", "created",
        ]
        read_only_fields = ["created"]

    def validate_cantidad(self, value):
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a cero")
        return value


class MovimientoStockSerializer(serializers.ModelSerializer):
    repuesto_nombre = serializers.CharField(source="repuesto.nombre", read_only=True)
    ot_numero = serializers.IntegerField(
        source="orden_trabajo.id", read_only=True, allow_null=True
    )

    class Meta:
        model = MovimientoStock
        fields = [
            "id", "repuesto", "repuesto_nombre", "tipo",
            "cantidad", "fecha", "orden_trabajo", "ot_numero",
            "precio_unitario",
        ]
