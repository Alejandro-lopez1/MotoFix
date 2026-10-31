# ?? Configuración Docker - MotoFix

## Cambios Realizados

### 1. Backend

? **backend/core/settings.py**
- Configuración condicional de SSL para base de datos
- `sslmode=require` solo con `ENVIRONMENT=production` (Render/Neon)
- Mejor manejo de variables de entorno

? **backend/.env** (NUEVO)
- Archivo de configuración local
- Database en SQLite para desarrollo
- DEBUG=True para desarrollo
- CORS habilitado para localhost:3000 y localhost:5173

? **backend/.dockerignore** (NUEVO)
- Excluye archivos innecesarios del build
- Optimiza tamaño de la imagen

? **backend/Dockerfile**
- Mejor manejo del puerto con ${PORT:-8000}
- Timeout aumentado a 60s
- Auto-creación de superusuario mejorada

### 2. Frontend

? **frontend/.env** (NUEVO)
- VITE_API_URL apuntando a http://localhost:8000/api

? **frontend/.dockerignore** (NUEVO)
- Excluye node_modules y otros archivos innecesarios

? **frontend/Dockerfile**
- Soporte para BUILD ARGS (VITE_API_URL)
- Multi-stage build optimizado
- npm ci en lugar de npm install

? **frontend/nginx.conf**
- Gzip compression habilitado
- Headers de seguridad añadidos
- Cache de assets estáticos
- SPA routing mejorado

### 3. Compose Files

? **docker-compose.yml** (ACTUALIZADO)
- Para desarrollo local
- Backend con runserver (recarga en vivo)
- Volúmenes sincronizados
- Mejor configuración de healthchecks

? **docker-compose.prod.yml** (NUEVO)
- Para producción
- Backend con gunicorn
- Múltiples workers (4)
- Timeout de 120s
- Healthchecks inclusos

### 4. Render

? **render.yaml** (ACTUALIZADO)
- Configuración correcta para ambos servicios
- Variables de entorno apropiadas
- Soporte para PostgreSQL linkado

### 5. Documentación

? **DEPLOYMENT.md** (NUEVO)
- Guía completa de despliegue
- Instrucciones para Render
- Troubleshooting

## Cómo Usar Esto

### Desarrollo Local

```bash
# Construir e iniciar
docker compose up --build

# En otro terminal, si necesitas ejecutar comandos
docker compose exec backend python manage.py shell

# Ver logs
docker compose logs -f

# Detener
docker compose down
```

**URLs:**
- Frontend: http://localhost
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs/
- Admin: http://localhost:8000/admin/ (admin/admin123)

### Producción (Local con Compose.prod)

```bash
# Construir e iniciar
docker compose -f docker-compose.prod.yml up --build

# Usar con variables de entorno reales
docker compose -f docker-compose.prod.yml up --build
```

### Render.com

1. Conectar repositorio GitHub a Render
2. Render lee automáticamente `render.yaml`
3. Se crean dos servicios: backend y frontend
4. Agregar servicio PostgreSQL y linkarlo al backend
5. Render maneja SSL automáticamente

## Variables de Entorno Clave

### Backend (production)

| Variable | Valor Ejemplo |
|----------|------------------|
| SECRET_KEY | (auto-generated) |
| DEBUG | False |
| ALLOWED_HOSTS | motofix.onrender.com |
| DATABASE_URL | postgres://... |
| CORS_ALLOWED_ORIGINS | https://motofix.onrender.com |
| CSRF_TRUSTED_ORIGINS | https://motofix.onrender.com |

### Frontend (production)

| Variable | Valor Ejemplo |
|----------|------------------|
| VITE_API_URL | https://api.motofix.onrender.com/api |

## Estructura de Archivos

```
MotoFix/
+-- backend/
¦   +-- .env                 ? Config desarrollo
¦   +-- .dockerignore        ? Archivos a ignorar
¦   +-- Dockerfile           ? Build backend
¦   +-- core/
¦   ¦   +-- settings.py     ? Config Django
¦   +-- requirements.txt
+-- frontend/
¦   +-- .env                 ? Config VITE
¦   +-- .dockerignore
¦   +-- Dockerfile           ? Build frontend
¦   +-- nginx.conf           ? Nginx config
¦   +-- vite.config.js
+-- docker-compose.yml       ? Desarrollo
+-- docker-compose.prod.yml  ? Producción
+-- render.yaml             ? Render config
+-- DEPLOYMENT.md           ? Guía completa
```

## Próximos Pasos

1. Verificar que `docker compose up --build` funciona localmente
2. Hacer push a GitHub
3. Conectar a Render
4. Configurar Database en Render
5. Actualizar dominios en render.yaml antes de deploy

## Notas Importantes

- `.env` tiene credenciales de DEV - NUNCA hacer push a Git
- `.gitignore` ya está configurado para excluir .env
- Render automáticamente genera SECRET_KEY
- Database en Render usa PostgreSQL (mejor que SQLite)
- SSL se configura automáticamente en Render
