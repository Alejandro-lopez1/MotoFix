from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from apps.ordenes.services import crear_orden_trabajo
from .services import registrar_cobro
from .models import Cobro


class CobroServiceTest(TestCase):
    def test_registrar_cobro_total(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
            "monto_mano_obra": 12000,
        })
        cobro = registrar_cobro(ot, 12000, "Efectivo")
        self.assertEqual(cobro.monto_cobrado, 12000)
        self.assertEqual(cobro.forma_pago, "Efectivo")
        self.assertEqual(cobro.saldo_pendiente, 0)

    def test_registrar_cobro_parcial(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
            "monto_mano_obra": 20000,
        })
        cobro = registrar_cobro(ot, 10000, "Transferencia")
        self.assertEqual(cobro.saldo_pendiente, 10000)
        ot.refresh_from_db()
        self.assertEqual(ot.saldo_pendiente, 10000)

    def test_cobro_mayor_al_saldo(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
            "monto_mano_obra": 5000,
        })
        cobro = registrar_cobro(ot, 8000, "Efectivo")
        self.assertEqual(cobro.saldo_pendiente, 0)

    def test_cobro_monto_cero(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
        })
        with self.assertRaises(ValueError):
            registrar_cobro(ot, 0, "Efectivo")


class CobroAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass123")
        response = self.client.post("/api/auth/login/", {
            "username": "testuser", "password": "testpass123"
        })
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_registrar_cobro_api(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
            "monto_mano_obra": 15000,
        })
        response = self.client.post(
            f"/api/ordenes/{ot.id}/registrar_cobro/",
            {"monto_cobrado": 15000, "forma_pago": "Efectivo"},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(float(response.data["saldo_pendiente"]), 0)
