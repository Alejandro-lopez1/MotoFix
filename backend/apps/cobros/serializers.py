from rest_framework import serializers
from .models import Cobro


class CobroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cobro
        fields = [
            "id", "orden_trabajo", "monto_cobrado",
            "forma_pago", "fecha", "saldo_pendiente",
        ]
        read_only_fields = ["fecha", "saldo_pendiente"]

    def validate_monto_cobrado(self, value):
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor a cero")
        return value
