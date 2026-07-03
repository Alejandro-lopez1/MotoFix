from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from .models import OrdenTrabajo, NotaOT, HistorialEstado
from .services import crear_orden_trabajo, cambiar_estado_ot


class OrdenTrabajoModelTest(TestCase):
    def test_crear_ot(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan Perez",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
        })
        self.assertEqual(ot.dominio, "AB-123-CD")
        self.assertEqual(ot.estado, "Recibida")
        self.assertEqual(ot.nombre_cliente, "Juan Perez")
        self.assertIsNotNone(ot.fecha_creacion)

    def test_calcular_monto_sugerido_sin_repuestos(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan Perez",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
            "monto_mano_obra": 10000,
        })
        self.assertEqual(ot.calcular_monto_sugerido(), 10000)

    def test_cambio_estado(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
        })
        ot = cambiar_estado_ot(ot, "En diagnóstico")
        self.assertEqual(ot.estado, "En diagnóstico")
        self.assertEqual(ot.historial_estados.count(), 2)

    def test_dominio_mayusculas(self):
        ot = crear_orden_trabajo({
            "dominio": "ab-123-cd",
            "nombre_cliente": "Juan",
            "telefono_cliente": "3765123456",
            "marca_moto": "Motomel",
            "descripcion_problema": "No arranca",
        })
        self.assertEqual(ot.dominio, "AB-123-CD")


class OrdenTrabajoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass123")
        response = self.client.post("/api/auth/login/", {
            "username": "testuser", "password": "testpass123"
        })
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_crear_ot_api(self):
        data = {
            "dominio": "ZZ-999-ZZ",
            "nombre_cliente": "Maria Garcia",
            "telefono_cliente": "3765987654",
            "marca_moto": "Zanella",
            "descripcion_problema": "Frena mal",
        }
        response = self.client.post("/api/ordenes/", data, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["dominio"], "ZZ-999-ZZ")
        self.assertEqual(response.data["estado"], "Recibida")

    def test_crear_ot_sin_patente(self):
        data = {
            "nombre_cliente": "Maria",
            "telefono_cliente": "3765987654",
            "descripcion_problema": "Frena mal",
        }
        response = self.client.post("/api/ordenes/", data, format="json")
        self.assertEqual(response.status_code, 400)

    def test_crear_ot_sin_descripcion(self):
        data = {
            "dominio": "ZZ-999-ZZ",
            "nombre_cliente": "Maria",
            "telefono_cliente": "3765987654",
            "descripcion_problema": "ok",
        }
        response = self.client.post("/api/ordenes/", data, format="json")
        self.assertEqual(response.status_code, 400)

    def test_cambiar_estado(self):
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Test",
            "telefono_cliente": "3765000000",
            "marca_moto": "Motomel",
            "descripcion_problema": "Prueba de estado",
        })
        response = self.client.patch(
            f"/api/ordenes/{ot.id}/estado/",
            {"estado": "En reparación"},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["estado"], "En reparación")

    def test_listar_ot_activas(self):
        crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Test",
            "telefono_cliente": "3765000000",
            "marca_moto": "Motomel",
            "descripcion_problema": "Test listado",
        })
        response = self.client.get("/api/ordenes/?activas=true")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data["results"]), 1)

    def test_autenticacion_requerida(self):
        self.client.credentials()
        response = self.client.get("/api/ordenes/")
        self.assertEqual(response.status_code, 401)
