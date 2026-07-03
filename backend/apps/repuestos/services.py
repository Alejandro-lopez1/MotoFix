from django.db import transaction
from .models import Repuesto, OTRepuesto, MovimientoStock


@transaction.atomic
def ingresar_stock(repuesto_id, cantidad, precio_unitario):
    repuesto = Repuesto.objects.select_for_update().get(id=repuesto_id)
    repuesto.actualizar_precio_promedio(cantidad, precio_unitario)
    repuesto.cantidad_stock += cantidad
    repuesto.save()
    MovimientoStock.objects.create(
        repuesto=repuesto,
        tipo="Ingreso",
        cantidad=cantidad,
        precio_unitario=precio_unitario,
    )
    return repuesto


@transaction.atomic
def asociar_repuesto_a_ot(ot, repuesto_id, cantidad):
    if ot.estado == "Entregada":
        raise ValueError("No se pueden agregar repuestos a una OT entregada")
    repuesto = Repuesto.objects.select_for_update().get(id=repuesto_id)
    cantidad = int(cantidad)
    if cantidad <= 0:
        raise ValueError("La cantidad debe ser mayor a cero")
    if repuesto.cantidad_stock < cantidad:
        raise ValueError(
            f"Stock insuficiente: disponible {repuesto.cantidad_stock} unidades"
        )
    item, created = OTRepuesto.objects.get_or_create(
        orden_trabajo=ot,
        repuesto=repuesto,
        defaults={
            "cantidad": cantidad,
            "precio_unitario": repuesto.precio_compra_promedio,
        },
    )
    if not created:
        item.cantidad += cantidad
        item.save()
    repuesto.cantidad_stock -= cantidad
    repuesto.save()
    MovimientoStock.objects.create(
        repuesto=repuesto,
        tipo="Egreso",
        cantidad=cantidad,
        orden_trabajo=ot,
        precio_unitario=repuesto.precio_compra_promedio,
    )
    ot.recalcular_saldo_pendiente()
    return item
