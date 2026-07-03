from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from apps.ordenes.services import crear_orden_trabajo, cambiar_estado_ot
from apps.cobros.services import registrar_cobro


class DashboardAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass123")
        response = self.client.post("/api/auth/login/", {
            "username": "testuser", "password": "testpass123"
        })
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_dashboard(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
            "monto_mano_obra": 10000,
        })
        cambiar_estado_ot(ot, "Lista para entregar")
        registrar_cobro(ot, 10000, "Efectivo")
        cambiar_estado_ot(ot, "Entregada")

        response = self.client.get("/api/reportes/dashboard/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("ordenes_activas", response.data)
