from django.db import models
from apps.clientes.models import Cliente
from apps.motocicletas.models import Motocicleta

ESTADOS_OT = [
    ("Recibida", "Recibida"),
    ("En diagnóstico", "En diagnóstico"),
    ("En reparación", "En reparación"),
    ("Esperando repuesto", "Esperando repuesto"),
    ("Lista para entregar", "Lista para entregar"),
    ("Entregada", "Entregada"),
]

ESTADOS_ACTIVOS = ["Recibida", "En diagnóstico", "En reparación", "Esperando repuesto", "Lista para entregar"]


class OrdenTrabajo(models.Model):
    cliente = models.ForeignKey(
        Cliente, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="ordenes_trabajo"
    )
    motocicleta = models.ForeignKey(
        Motocicleta, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="ordenes_trabajo"
    )
    dominio = models.CharField(max_length=10, db_index=True)
    nombre_cliente = models.CharField(max_length=100)
    telefono_cliente = models.CharField(max_length=20, blank=True, default="")
    marca_moto = models.CharField(max_length=50)
    modelo_moto = models.CharField(max_length=50, blank=True, default="")
    descripcion_problema = models.TextField()
    diagnostico = models.TextField(blank=True, default="")
    estado = models.CharField(max_length=30, choices=ESTADOS_OT, default="Recibida")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    fecha_entrega_estimada = models.DateField(null=True, blank=True)
    monto_mano_obra = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    margen_repuestos = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    saldo_pendiente = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Orden de Trabajo"
        verbose_name_plural = "Órdenes de Trabajo"
        ordering = ["-fecha_creacion"]

    def __str__(self):
        return f"OT #{self.id} - {self.dominio} - {self.estado}"

    def calcular_monto_sugerido(self):
        total_repuestos = 0
        for item in self.repuestos_utilizados.all():
            precio = item.precio_unitario or item.repuesto.precio_compra_promedio
            margen = 1 + (self.margen_repuestos / 100) if self.margen_repuestos else 1
            total_repuestos += item.cantidad * float(precio) * margen
        mano_obra = float(self.monto_mano_obra or 0)
        return round(mano_obra + total_repuestos, 2)

    def recalcular_saldo_pendiente(self):
        total_cobrado = sum(c.monto_cobrado for c in self.cobros.all())
        self.saldo_pendiente = max(0, self.calcular_monto_sugerido() - float(total_cobrado))
        self.save(update_fields=["saldo_pendiente"])


class NotaOT(models.Model):
    orden_trabajo = models.ForeignKey(
        OrdenTrabajo, on_delete=models.CASCADE, related_name="notas"
    )
    texto = models.TextField()
    fecha_hora = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Nota de OT"
        verbose_name_plural = "Notas de OT"
        ordering = ["-fecha_hora"]

    def __str__(self):
        return f"Nota OT#{self.orden_trabajo_id} - {self.fecha_hora.strftime('%d/%m/%Y %H:%M')}"


class HistorialEstado(models.Model):
    orden_trabajo = models.ForeignKey(
        OrdenTrabajo, on_delete=models.CASCADE, related_name="historial_estados"
    )
    estado_anterior = models.CharField(max_length=30, blank=True, default="")
    estado_nuevo = models.CharField(max_length=30)
    fecha_cambio = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Historial de Estado"
        verbose_name_plural = "Historial de Estados"
        ordering = ["-fecha_cambio"]

    def __str__(self):
        return f"OT#{self.orden_trabajo_id}: {self.estado_anterior} -> {self.estado_nuevo}"
