from django.db import models

FORMA_PAGO_CHOICES = [
    ("Efectivo", "Efectivo"),
    ("Transferencia", "Transferencia"),
]


class Cobro(models.Model):
    orden_trabajo = models.ForeignKey(
        "ordenes.OrdenTrabajo", on_delete=models.CASCADE,
        related_name="cobros"
    )
    monto_cobrado = models.DecimalField(max_digits=10, decimal_places=2)
    forma_pago = models.CharField(max_length=20, choices=FORMA_PAGO_CHOICES)
    fecha = models.DateTimeField(auto_now_add=True)
    saldo_pendiente = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Cobro"
        verbose_name_plural = "Cobros"
        ordering = ["-fecha"]

    def __str__(self):
        return f"Cobro OT#{self.orden_trabajo_id} - ${self.monto_cobrado} ({self.forma_pago})"
