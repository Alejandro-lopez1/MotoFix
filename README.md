# MotoFix - Sistema de Gestión Operativa para Taller de Motocicletas

Aplicación web progresiva (PWA) para la gestión de un taller de motocicletas, construida con **React 19** + **Django REST Framework** + **PostgreSQL**.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19, Vite, MUI 6, TanStack Query, React Hook Form, Zod |
| Backend | Django 5, DRF 3.15, SimpleJWT, django-filter |
| Base de Datos | PostgreSQL 16 |
| PWA | vite-plugin-pwa, Workbox |
| Contenedores | Docker, docker-compose |

## Módulos

1. **Órdenes de Trabajo y Clientes** - Registro, seguimiento de estados, historial por cliente/patente
2. **Stock de Repuestos** - Inventario, movimientos, alertas de stock bajo, precio promedio ponderado
3. **Cobros y Reportes** - Cobros parciales/totales, saldos pendientes, resumen mensual, dashboard

## Estados de una Orden de Trabajo

```
Recibida → En diagnóstico → En reparación ↔ Esperando repuesto → Lista para entregar → Entregada
```

## Requisitos

- Docker y docker-compose (producción)
- Python 3.12+ y Node.js 20+ (desarrollo local)

## Inicio Rápido con Docker

```bash
docker compose up --build
```

Esto levanta:
- PostgreSQL en `localhost:5432`
- Backend Django en `localhost:8000`
- Frontend React en `localhost:80`

El admin por defecto se crea automáticamente con:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

Acceder a:
- Frontend: `http://localhost`
- API Docs (Swagger): `http://localhost:8000/api/docs/`
- Admin Django: `http://localhost:8000/admin/`

## Desarrollo Local

### Backend

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

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Tests

```bash
cd backend
source venv/bin/activate
python manage.py test
```

## Variables de Entorno

Ver `.env.example` para la lista completa de variables requeridas.

## Estructura del Proyecto

```
├── backend/
│   ├── core/               # settings, urls, wsgi
│   ├── apps/
│   │   ├── clientes/       # Modelo y API de clientes
│   │   ├── motocicletas/   # Modelo y API de motocicletas
│   │   ├── ordenes/        # OT, notas, historial de estados
│   │   ├── repuestos/      # Repuestos, movimientos, OTRepuesto
│   │   ├── cobros/         # Cobros y servicios financieros
│   │   ├── reportes/       # Dashboard y reporte mensual
│   │   └── common/         # Permisos y utilidades compartidas
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes UI reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── hooks/          # Custom hooks (React Query)
│   │   ├── services/       # Clientes Axios por recurso
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── layouts/        # MainLayout, AuthLayout
│   │   └── routes/         # Configuración del router
│   └── package.json
├── docker-compose.yml
└── .env.example
```

## API REST Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login/` | Login JWT |
| POST | `/api/auth/refresh/` | Refresh token |
| GET/POST | `/api/clientes/` | CRUD clientes |
| GET | `/api/motocicletas/buscar/{dominio}/` | Buscar moto por patente |
| GET | `/api/motocicletas/{id}/historial/` | Historial de OT por moto |
| GET/POST | `/api/ordenes/` | Listar/Crear OT |
| GET | `/api/ordenes/{id}/` | Detalle de OT |
| PATCH | `/api/ordenes/{id}/estado/` | Cambiar estado |
| POST | `/api/ordenes/{id}/agregar_repuesto/` | Asociar repuesto |
| POST | `/api/ordenes/{id}/registrar_cobro/` | Registrar cobro |
| GET/POST | `/api/repuestos/` | CRUD repuestos |
| POST | `/api/repuestos/{id}/ingresar_stock/` | Ingreso de stock |
| GET | `/api/repuestos/bajo_minimo/` | Alertas stock bajo |
| GET | `/api/reportes/dashboard/` | Dashboard |
| GET | `/api/reportes/mensual/` | Reporte mensual |
| GET | `/api/docs/` | Swagger UI |
