# 🏍️ MotoFix

Sistema de Gestión Operativa para Talleres de Motocicletas.

MotoFix es una aplicación web desarrollada para administrar la operación diaria de un taller de motocicletas. Permite gestionar clientes, motocicletas, órdenes de trabajo, repuestos y cobros desde una única interfaz.

El proyecto fue construido utilizando una arquitectura Full Stack basada en **React + Django REST Framework + PostgreSQL**, completamente contenedorizada con Docker y preparada para evolucionar como Progressive Web App (PWA).

---

# 🚀 Características

- Gestión de clientes (CRUD)
- Gestión de motocicletas (CRUD)
- Gestión de órdenes de trabajo
- Seguimiento de estados de reparación
- Gestión de repuestos
- Registro de cobros
- Dashboard de información
- API REST documentada
- Autenticación mediante JWT
- Diseño Responsive
- Docker Compose para desarrollo
- Base de datos PostgreSQL

---

# 🛠 Stack Tecnológico

| Capa | Tecnología |
|-------|------------|
| Frontend | React 19 + Vite |
| UI | Material UI 6 |
| Estado | TanStack Query |
| Formularios | React Hook Form + Zod |
| Backend | Django 5 |
| API | Django REST Framework |
| Autenticación | JWT (SimpleJWT) |
| Base de Datos | PostgreSQL 16 |
| Contenedores | Docker + Docker Compose |
| PWA | Workbox + vite-plugin-pwa |

---

# 🏗 Arquitectura

```text
                 React + Vite
                      │
                      ▼
                 Nginx (Docker)
                      │
                      ▼
          Django REST Framework
                      │
                      ▼
                PostgreSQL 16
```

---

# 📦 Módulos

## Clientes

- Alta
- Baja
- Modificación
- Consulta

---

## Motocicletas

- Registro de motocicletas
- Asociación con clientes
- Historial de reparaciones

---

## Órdenes de Trabajo

- Creación
- Seguimiento
- Cambio de estados
- Asociación de repuestos
- Registro de mano de obra

Estados disponibles:

```
Recibida
    ↓
En diagnóstico
    ↓
En reparación
    ↕
Esperando repuesto
    ↓
Lista para entregar
    ↓
Entregada
```

---

## Repuestos

- Gestión de inventario
- Ingreso de stock
- Alertas por stock mínimo
- Precio promedio ponderado

---

## Cobros

- Cobros parciales
- Cobros totales
- Saldo pendiente
- Reportes

---

# 📱 Responsive

La aplicación fue desarrollada para funcionar tanto en escritorio como en dispositivos móviles.

---

# 🔐 Autenticación

Se implementó autenticación basada en JSON Web Tokens (JWT).

Endpoints principales:

- Login
- Refresh Token
- Protección de endpoints mediante Bearer Token

---

# 📚 API REST

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /api/auth/login/ | Login |
| POST | /api/auth/refresh/ | Renovar Token |
| GET / POST | /api/clientes/ | CRUD Clientes |
| GET | /api/motocicletas/buscar/{dominio}/ | Buscar motocicleta |
| GET | /api/motocicletas/{id}/historial/ | Historial |
| GET / POST | /api/ordenes/ | CRUD Órdenes |
| PATCH | /api/ordenes/{id}/estado/ | Cambio de estado |
| POST | /api/ordenes/{id}/agregar_repuesto/ | Agregar repuesto |
| POST | /api/ordenes/{id}/registrar_cobro/ | Registrar cobro |
| GET / POST | /api/repuestos/ | CRUD Repuestos |
| POST | /api/repuestos/{id}/ingresar_stock/ | Ingreso de stock |
| GET | /api/repuestos/bajo_minimo/ | Stock mínimo |
| GET | /api/reportes/dashboard/ | Dashboard |
| GET | /api/reportes/mensual/ | Reporte mensual |

Documentación Swagger:

```
http://localhost:8000/api/docs/
```

---

# 🐳 Ejecución con Docker

Requisitos:

- Docker
- Docker Compose

Ejecutar:

```bash
docker compose up --build
```

Servicios:

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost |
| Backend | http://localhost:8000 |
| PostgreSQL | localhost:5433 |

Usuario administrador generado automáticamente:

```
Usuario:
admin

Contraseña:
admin123
```

---

# 💻 Desarrollo Local

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

cp ../.env.example .env

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🧪 Testing

Backend:

```bash
python manage.py test
```

Pruebas de carga:

Se utilizaron scripts de **k6** para validar el comportamiento del sistema bajo concurrencia.

Resultados obtenidos:

| Métrica | Resultado |
|----------|-----------|
| Usuarios Concurrentes | 50 |
| Duración | 60 segundos |
| Requests | 12.084 |
| Errores | 0 % |
| Tiempo promedio | 246 ms |
| p95 | 446 ms |

Durante las pruebas:

- Sin errores HTTP.
- Sin pérdidas de datos.
- Sin reinicios de contenedores.
- PostgreSQL estable.
- Bajo consumo de CPU y memoria.

---

# 📂 Estructura

```
backend/
frontend/
tests/
docker-compose.yml
.env.example
README.md
```

---

# ⚙ Variables de entorno

Consultar:

```
.env.example
```

---

# 📌 Estado del proyecto

## Implementado

- Autenticación JWT
- CRUD Clientes
- CRUD Motocicletas
- CRUD Órdenes
- CRUD Repuestos
- Cobros
- Dashboard
- Docker
- Responsive
- API REST
- Swagger
- Pruebas de carga

## Pendiente

- Instalación como PWA
- Deploy en la nube
- Roles y permisos
- Reportes PDF
- Notificaciones

---

# 📈 Próximas mejoras

- Multiusuario
- Gestión de proveedores
- Agenda de turnos
- Reportes avanzados
- Exportación PDF y Excel
- Notificaciones automáticas
- Dashboard analítico con indicadores del negocio
- Módulo de facturación electrónica con integración a ARCA
- Registro de compras y gestión impositiva
- Integración con pasarelas de pago

---

# 📄 Licencia

MIT License.
