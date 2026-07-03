from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, Q, F
from django.utils import timezone
from datetime import datetime, timedelta
from apps.ordenes.models import OrdenTrabajo, ESTADOS_ACTIVOS
from apps.repuestos.models import Repuesto
from apps.cobros.models import Cobro


class DashboardView(APIView):
    def get(self, request):
        now = timezone.now()
        primer_dia_mes = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        ordenes_activas = OrdenTrabajo.objects.filter(estado__in=ESTADOS_ACTIVOS).count()
        ordenes_mes = OrdenTrabajo.objects.filter(
            fecha_creacion__gte=primer_dia_mes
        )
        ordenes_cerradas_mes = ordenes_mes.filter(estado="Entregada").count()
        ordenes_abiertas_mes = ordenes_mes.exclude(estado="Entregada").count()

        cobros_mes = Cobro.objects.filter(fecha__gte=primer_dia_mes)
        ingresos_efectivo = cobros_mes.filter(forma_pago="Efectivo").aggregate(
            total=Sum("monto_cobrado")
        )["total"] or 0
        ingresos_transferencia = cobros_mes.filter(forma_pago="Transferencia").aggregate(
            total=Sum("monto_cobrado")
        )["total"] or 0

        repuestos_bajos = Repuesto.objects.filter(
            cantidad_stock__lte=F("punto_reorden")
        )
        repuestos_data = [
            {
                "id": r.id,
                "nombre": r.nombre,
                "cantidad_stock": r.cantidad_stock,
                "punto_reorden": r.punto_reorden,
            }
            for r in repuestos_bajos
        ]

        saldo_pendiente_total = OrdenTrabajo.objects.aggregate(
            total=Sum("saldo_pendiente")
        )["total"] or 0

        ordenes_recientes = OrdenTrabajo.objects.filter(
            estado__in=ESTADOS_ACTIVOS
        ).order_by("-fecha_creacion")[:5]
        recientes = [
            {
                "id": ot.id,
                "dominio": ot.dominio,
                "nombre_cliente": ot.nombre_cliente,
                "estado": ot.estado,
                "fecha_creacion": ot.fecha_creacion,
            }
            for ot in ordenes_recientes
        ]

        return Response({
            "ordenes_activas": ordenes_activas,
            "ordenes_cerradas_mes": ordenes_cerradas_mes,
            "ordenes_abiertas_mes": ordenes_abiertas_mes,
            "ingresos_efectivo": float(ingresos_efectivo),
            "ingresos_transferencia": float(ingresos_transferencia),
            "ingresos_total": float(ingresos_efectivo + ingresos_transferencia),
            "saldo_pendiente_total": float(saldo_pendiente_total),
            "repuestos_bajos": repuestos_data,
            "ordenes_recientes": recientes,
        })


class ReporteMensualView(APIView):
    def get(self, request):
        month = request.query_params.get("mes")
        year = request.query_params.get("anio")
        now = timezone.now()
        if month and year:
            mes = int(month)
            anio = int(year)
        else:
            mes = now.month
            anio = now.year

        if mes == 12:
            inicio = datetime(anio, mes, 1, tzinfo=now.tzinfo)
            fin = datetime(anio + 1, 1, 1, tzinfo=now.tzinfo)
        else:
            inicio = datetime(anio, mes, 1, tzinfo=now.tzinfo)
            fin = datetime(anio, mes + 1, 1, tzinfo=now.tzinfo)

        ordenes_cerradas = OrdenTrabajo.objects.filter(
            estado="Entregada",
            fecha_actualizacion__gte=inicio,
            fecha_actualizacion__lt=fin,
        )
        total_ot_cerradas = ordenes_cerradas.count()

        cobros_periodo = Cobro.objects.filter(fecha__gte=inicio, fecha__lt=fin)
        total_efectivo = cobros_periodo.filter(forma_pago="Efectivo").aggregate(
            total=Sum("monto_cobrado")
        )["total"] or 0
        total_transferencia = cobros_periodo.filter(forma_pago="Transferencia").aggregate(
            total=Sum("monto_cobrado")
        )["total"] or 0
        total_ingresos = float(total_efectivo + total_transferencia)

        saldo_pendiente_total = OrdenTrabajo.objects.aggregate(
            total=Sum("saldo_pendiente")
        )["total"] or 0

        repuestos_bajos = Repuesto.objects.filter(
            cantidad_stock__lte=F("punto_reorden")
        )
        repuestos_data = [
            {
                "id": r.id,
                "nombre": r.nombre,
                "cantidad_stock": r.cantidad_stock,
                "punto_reorden": r.punto_reorden,
            }
            for r in repuestos_bajos
        ]

        return Response({
            "mes": mes,
            "anio": anio,
            "total_ot_cerradas": total_ot_cerradas,
            "ingresos_efectivo": float(total_efectivo),
            "ingresos_transferencia": float(total_transferencia),
            "ingresos_total": total_ingresos,
            "saldo_pendiente_total": float(saldo_pendiente_total),
            "repuestos_bajos": repuestos_data,
        })
