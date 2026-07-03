from rest_framework import serializers
from .models import Motocicleta

class MotocicletaSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source="cliente.nombre", read_only=True)

    class Meta:
        model = Motocicleta
        fields = ["id", "dominio", "marca", "modelo", "cliente", "cliente_nombre", "created", "updated"]
