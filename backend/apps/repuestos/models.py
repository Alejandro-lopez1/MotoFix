from django.db import models
from django.db.models import Sum, F


class Repuesto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, default="")
    proveedor = models.CharField(max_length=100, blank=True, default="")
    precio_compra_promedio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cantidad_stock = models.IntegerField(default=0)
    punto_reorden = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Repuesto"
        verbose_name_plural = "Repuestos"
        ordering = ["nombre"]

    def __str__(self):
        return f"{self.nombre} (stock: {self.cantidad_stock})"

    def actualizar_precio_promedio(self, cantidad_ingreso, precio_unitario):
        total_valor_actual = float(self.precio_compra_promedio) * self.cantidad_stock
        total_valor_ingreso = float(precio_unitario) * cantidad_ingreso
        nueva_cantidad = self.cantidad_stock + cantidad_ingreso
        if nueva_cantidad > 0:
            self.precio_compra_promedio = round(
                (total_valor_actual + total_valor_ingreso) / nueva_cantidad, 2
            )

    def esta_bajo_minimo(self):
        return self.cantidad_stock <= self.punto_reorden

    def valor_total_stock(self):
        return float(self.precio_compra_promedio) * self.cantidad_stock


class OTRepuesto(models.Model):
    orden_trabajo = models.ForeignKey(
        "ordenes.OrdenTrabajo", on_delete=models.CASCADE,
        related_name="repuestos_utilizados"
    )
    repuesto = models.ForeignKey(Repuesto, on_delete=models.PROTECT, related_name="ot_repuestos")
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Repuesto usado en OT"
        verbose_name_plural = "Repuestos usados en OT"
        unique_together = ["orden_trabajo", "repuesto"]

    def __str__(self):
        return f"OT#{self.orden_trabajo_id} - {self.repuesto.nombre} x{self.cantidad}"


class MovimientoStock(models.Model):
    TIPO_CHOICES = [
        ("Ingreso", "Ingreso"),
        ("Egreso", "Egreso"),
    ]
    repuesto = models.ForeignKey(
        Repuesto, on_delete=models.CASCADE,
        related_name="movimientos"
    )
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    cantidad = models.PositiveIntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    orden_trabajo = models.ForeignKey(
        "ordenes.OrdenTrabajo", on_delete=models.SET_NULL,
        null=True, blank=True, related_name="movimientos_stock"
    )
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = "Movimiento de Stock"
        verbose_name_plural = "Movimientos de Stock"
        ordering = ["-fecha"]

    def __str__(self):
        return f"{self.tipo} - {self.repuesto.nombre} x{self.cantidad}"
