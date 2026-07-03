from apps.clientes.models import Cliente
from apps.motocicletas.models import Motocicleta
from .models import OrdenTrabajo, HistorialEstado


def obtener_o_crear_cliente(nombre, telefono):
    cliente, created = Cliente.objects.get_or_create(
        nombre__iexact=nombre.strip(),
        defaults={"nombre": nombre.strip(), "telefono": telefono or ""},
    )
    if telefono and not cliente.telefono:
        cliente.telefono = telefono
        cliente.save(update_fields=["telefono"])
    return cliente


def obtener_o_crear_motocicleta(dominio, marca, modelo, cliente):
    dominio = dominio.upper()
    moto, created = Motocicleta.objects.get_or_create(
        dominio=dominio,
        defaults={
            "marca": marca or "",
            "modelo": modelo or "",
            "cliente": cliente,
        },
    )
    update_fields = []
    if marca and moto.marca != marca:
        moto.marca = marca
        update_fields.append("marca")
    if modelo and moto.modelo != modelo:
        moto.modelo = modelo
        update_fields.append("modelo")
    if cliente and moto.cliente != cliente:
        moto.cliente = cliente
        update_fields.append("cliente")
    if update_fields:
        moto.save(update_fields=update_fields)
    return moto


def crear_orden_trabajo(data):
    cliente = obtener_o_crear_cliente(data["nombre_cliente"], data.get("telefono_cliente", ""))
    moto = obtener_o_crear_motocicleta(
        data["dominio"],
        data.get("marca_moto", ""),
        data.get("modelo_moto", ""),
        cliente,
    )
    ot = OrdenTrabajo.objects.create(
        cliente=cliente,
        motocicleta=moto,
        dominio=data["dominio"].upper(),
        nombre_cliente=cliente.nombre,
        telefono_cliente=cliente.telefono,
        marca_moto=data.get("marca_moto", "") or "",
        modelo_moto=data.get("modelo_moto", "") or "",
        descripcion_problema=data["descripcion_problema"],
        diagnostico=data.get("diagnostico", ""),
        fecha_entrega_estimada=data.get("fecha_entrega_estimada"),
        monto_mano_obra=data.get("monto_mano_obra"),
        margen_repuestos=data.get("margen_repuestos", 0),
    )
    HistorialEstado.objects.create(
        orden_trabajo=ot,
        estado_anterior="",
        estado_nuevo="Recibida",
    )
    return ot


def cambiar_estado_ot(ot, nuevo_estado):
    estado_anterior = ot.estado
    ot.estado = nuevo_estado
    ot.save(update_fields=["estado", "fecha_actualizacion"])
    HistorialEstado.objects.create(
        orden_trabajo=ot,
        estado_anterior=estado_anterior,
        estado_nuevo=nuevo_estado,
    )
    return ot
