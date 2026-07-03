from django.contrib import admin
from .models import OrdenTrabajo, NotaOT, HistorialEstado

@admin.register(OrdenTrabajo)
class OrdenTrabajoAdmin(admin.ModelAdmin):
    list_display = ["id", "dominio", "nombre_cliente", "estado", "fecha_creacion", "saldo_pendiente"]
    list_filter = ["estado"]
    search_fields = ["dominio", "nombre_cliente"]

@admin.register(NotaOT)
class NotaOTAdmin(admin.ModelAdmin):
    list_display = ["orden_trabajo", "fecha_hora"]

@admin.register(HistorialEstado)
class HistorialEstadoAdmin(admin.ModelAdmin):
    list_display = ["orden_trabajo", "estado_anterior", "estado_nuevo", "fecha_cambio"]
