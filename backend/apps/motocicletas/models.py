from django.db import models
from apps.clientes.models import Cliente

class Motocicleta(models.Model):
    dominio = models.CharField(max_length=10, unique=True)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50, blank=True, default="")
    cliente = models.ForeignKey(
        Cliente, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="motocicletas"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Motocicleta"
        verbose_name_plural = "Motocicletas"
        ordering = ["-created"]

    def __str__(self):
        return f"{self.dominio} - {self.marca} {self.modelo}"
