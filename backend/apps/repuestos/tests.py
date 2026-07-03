from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from .models import Repuesto
from .services import ingresar_stock, asociar_repuesto_a_ot
from apps.ordenes.services import crear_orden_trabajo


class RepuestoModelTest(TestCase):
    def test_crear_repuesto(self):
        r = Repuesto.objects.create(
            nombre="Bujía NGK CR6HSA",
            precio_compra_promedio=1800,
            cantidad_stock=10,
            punto_reorden=5,
        )
        self.assertEqual(r.nombre, "Bujía NGK CR6HSA")
        self.assertEqual(r.cantidad_stock, 10)
        self.assertFalse(r.esta_bajo_minimo())

    def test_esta_bajo_minimo(self):
        r = Repuesto.objects.create(
            nombre="Filtro de aire",
            precio_compra_promedio=3200,
            cantidad_stock=3,
            punto_reorden=5,
        )
        self.assertTrue(r.esta_bajo_minimo())

    def test_valor_total_stock(self):
        r = Repuesto.objects.create(
            nombre="Cadena 428",
            precio_compra_promedio=5000,
            cantidad_stock=4,
            punto_reorden=2,
        )
        self.assertEqual(r.valor_total_stock(), 20000)

    def test_actualizar_precio_promedio(self):
        r = Repuesto.objects.create(
            nombre="Bujía",
            precio_compra_promedio=1800,
            cantidad_stock=10,
            punto_reorden=5,
        )
        r.actualizar_precio_promedio(5, 1900)
        self.assertEqual(r.precio_compra_promedio, 1833.33)


class RepuestoServiceTest(TestCase):
    def test_ingresar_stock(self):
        r = Repuesto.objects.create(
            nombre="Bujía NGK",
            precio_compra_promedio=1800,
            cantidad_stock=10,
            punto_reorden=5,
        )
        r = ingresar_stock(r.id, 5, 1900)
        self.assertEqual(r.cantidad_stock, 15)
        self.assertEqual(r.precio_compra_promedio, 1833.33)

    def test_asociar_repuesto_a_ot(self):
        r = Repuesto.objects.create(
            nombre="Bujía NGK",
            precio_compra_promedio=1800,
            cantidad_stock=10,
            punto_reorden=5,
        )
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Test",
            "telefono_cliente": "3765000000",
            "marca_moto": "Motomel",
            "descripcion_problema": "Test repuestos",
        })
        item = asociar_repuesto_a_ot(ot, r.id, 2)
        r.refresh_from_db()
        self.assertEqual(item.cantidad, 2)
        self.assertEqual(r.cantidad_stock, 8)

    def test_asociar_repuesto_stock_insuficiente(self):
        r = Repuesto.objects.create(
            nombre="Cadena 428",
            precio_compra_promedio=5000,
            cantidad_stock=2,
            punto_reorden=3,
        )
        ot = crear_orden_trabajo({
            "dominio": "AB-123-CD",
            "nombre_cliente": "Test",
            "telefono_cliente": "3765000000",
            "marca_moto": "Motomel",
            "descripcion_problema": "Test insuficiente",
        })
        with self.assertRaises(ValueError):
            asociar_repuesto_a_ot(ot, r.id, 5)


class RepuestoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass123")
        response = self.client.post("/api/auth/login/", {
            "username": "testuser", "password": "testpass123"
        })
        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_crear_repuesto_api(self):
        data = {
            "nombre": "Bujía NGK CR6HSA",
            "precio_compra_promedio": 1800,
            "cantidad_stock": 10,
            "punto_reorden": 5,
        }
        response = self.client.post("/api/repuestos/", data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_ingresar_stock_api(self):
        r = Repuesto.objects.create(
            nombre="Bujía NGK",
            precio_compra_promedio=1800,
            cantidad_stock=10,
            punto_reorden=5,
        )
        response = self.client.post(
            f"/api/repuestos/{r.id}/ingresar_stock/",
            {"cantidad": 5, "precio_unitario": 1900},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["cantidad_stock"], 15)

    def test_repuestos_bajo_minimo(self):
        Repuesto.objects.create(
            nombre="Filtro bajo",
            precio_compra_promedio=1000,
            cantidad_stock=2,
            punto_reorden=5,
        )
        Repuesto.objects.create(
            nombre="Repuesto normal",
            precio_compra_promedio=1000,
            cantidad_stock=10,
            punto_reorden=5,
        )
        response = self.client.get("/api/repuestos/bajo_minimo/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
