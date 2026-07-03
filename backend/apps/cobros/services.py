from django.db import transaction
from .models import Cobro


@transaction.atomic
def registrar_cobro(ot, monto_cobrado, forma_pago):
    monto = float(monto_cobrado)
    if monto <= 0:
        raise ValueError("El monto debe ser mayor a cero")
    if forma_pago not in ["Efectivo", "Transferencia"]:
        raise ValueError("La forma de pago debe ser Efectivo o Transferencia")
    total_sugerido = ot.calcular_monto_sugerido()
    total_cobrado = sum(float(c.monto_cobrado) for c in ot.cobros.all())
    nuevo_saldo = max(0, total_sugerido - total_cobrado - monto)
    cobro = Cobro.objects.create(
        orden_trabajo=ot,
        monto_cobrado=monto,
        forma_pago=forma_pago,
        saldo_pendiente=nuevo_saldo,
    )
    ot.saldo_pendiente = nuevo_saldo
    ot.save(update_fields=["saldo_pendiente"])
    return cobro
