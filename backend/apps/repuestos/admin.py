from django.contrib import admin
from .models import Repuesto, OTRepuesto, MovimientoStock

@admin.register(Repuesto)
class RepuestoAdmin(admin.ModelAdmin):
    list_display = ["nombre", "cantidad_stock", "punto_reorden", "precio_compra_promedio"]
    search_fields = ["nombre"]

@admin.register(OTRepuesto)
class OTRepuestoAdmin(admin.ModelAdmin):
    list_display = ["orden_trabajo", "repuesto", "cantidad"]

@admin.register(MovimientoStock)
class MovimientoStockAdmin(admin.ModelAdmin):
    list_display = ["repuesto", "tipo", "cantidad", "fecha"]
    list_filter = ["tipo"]
