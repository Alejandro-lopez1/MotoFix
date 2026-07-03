from django.contrib import admin
from .models import Cobro

@admin.register(Cobro)
class CobroAdmin(admin.ModelAdmin):
    list_display = ["orden_trabajo", "monto_cobrado", "forma_pago", "fecha", "saldo_pendiente"]
    list_filter = ["forma_pago"]
