from rest_framework import serializers
from .models import OrdenTrabajo, NotaOT, HistorialEstado


class NotaOTSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotaOT
        fields = ["id", "orden_trabajo", "texto", "fecha_hora"]
        read_only_fields = ["fecha_hora"]

    def validate_texto(self, value):
        if not value.strip():
            raise serializers.ValidationError("La nota no puede estar vacía")
        return value


class HistorialEstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialEstado
        fields = ["id", "estado_anterior", "estado_nuevo", "fecha_cambio"]


class OrdenTrabajoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenTrabajo
        fields = [
            "id", "dominio", "nombre_cliente", "telefono_cliente",
            "marca_moto", "modelo_moto", "estado",
            "fecha_creacion", "fecha_entrega_estimada", "saldo_pendiente",
        ]


class SimpleRepuestoSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    repuesto_nombre = serializers.CharField(source="repuesto.nombre")
    cantidad = serializers.IntegerField()
    precio_unitario = serializers.DecimalField(max_digits=10, decimal_places=2)

class SimpleCobroSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    monto_cobrado = serializers.DecimalField(max_digits=10, decimal_places=2)
    forma_pago = serializers.CharField()
    fecha = serializers.DateTimeField()
    saldo_pendiente = serializers.DecimalField(max_digits=10, decimal_places=2)

class OrdenTrabajoDetailSerializer(serializers.ModelSerializer):
    notas = NotaOTSerializer(many=True, read_only=True)
    historial_estados = HistorialEstadoSerializer(many=True, read_only=True)
    monto_sugerido = serializers.SerializerMethodField()
    repuestos_utilizados = serializers.SerializerMethodField()
    cobros = serializers.SerializerMethodField()

    class Meta:
        model = OrdenTrabajo
        fields = [
            "id", "cliente", "motocicleta", "dominio",
            "nombre_cliente", "telefono_cliente",
            "marca_moto", "modelo_moto",
            "descripcion_problema", "diagnostico",
            "estado", "fecha_creacion", "fecha_actualizacion",
            "fecha_entrega_estimada", "monto_mano_obra",
            "margen_repuestos", "saldo_pendiente",
            "notas", "historial_estados", "monto_sugerido",
            "repuestos_utilizados", "cobros",
        ]
        read_only_fields = ["fecha_creacion", "fecha_actualizacion", "saldo_pendiente"]

    def get_monto_sugerido(self, obj):
        return obj.calcular_monto_sugerido()

    def get_repuestos_utilizados(self, obj):
        items = obj.repuestos_utilizados.select_related("repuesto").all()
        return SimpleRepuestoSerializer(items, many=True).data

    def get_cobros(self, obj):
        items = obj.cobros.all()
        return SimpleCobroSerializer(items, many=True).data


class OrdenTrabajoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenTrabajo
        fields = [
            "dominio", "nombre_cliente", "telefono_cliente",
            "marca_moto", "modelo_moto",
            "descripcion_problema", "diagnostico",
            "fecha_entrega_estimada", "monto_mano_obra",
            "margen_repuestos",
        ]

    def validate_dominio(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("El dominio debe tener al menos 6 caracteres")
        return value.upper()

    def validate_nombre_cliente(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("El nombre debe tener al menos 2 caracteres")
        return value

    def validate_descripcion_problema(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("La descripción debe tener al menos 5 caracteres")
        return value


class OrdenTrabajoEstadoSerializer(serializers.Serializer):
    estado = serializers.ChoiceField(choices=[e[0] for e in OrdenTrabajo._meta.get_field("estado").choices])

    def validate_estado(self, value):
        if value == "Entregada":
            instance = getattr(self, "instance", None)
            if instance and instance.saldo_pendiente and instance.saldo_pendiente > 0:
                pass  # Solo advertencia, no bloquea
        return value
