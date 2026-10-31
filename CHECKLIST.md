# ? Checklist - MotoFix Docker/Render Setup

## Archivos Creados y Configurados

### Root Directory
- [x] `docker-compose.yml` - Desarrollo local
- [x] `docker-compose.prod.yml` - Producción local
- [x] `render.yaml` - Configuración Render
- [x] `DEPLOYMENT.md` - Guía de despliegue
- [x] `DOCKER_SETUP.md` - Guía de configuración Docker
- [x] `docker-compose.yml.bak` - Backup del original

### Backend (`backend/`)
- [x] `.env` - Configuración local
- [x] `.dockerignore` - Archivos ignorados en build
- [x] `Dockerfile` - Build optimizado
- [x] `core/settings.py` - SSL condicional + env vars
- [x] `requirements.txt` - Dependencias Python

### Frontend (`frontend/`)
- [x] `.env` - Configuración VITE
- [x] `.dockerignore` - Archivos ignorados en build
- [x] `Dockerfile` - Multi-stage build con BUILD ARGS
- [x] `nginx.conf` - Headers de seguridad + caching
- [x] `package.json` - Dependencias Node
- [x] `vite.config.js` - Configuración Vite

## Verificaciones Necesarias

### 1. Variables de Entorno

**Backend (.env - Desarrollo)**
```bash
cat backend/.env
```
Debería contener:
- [x] SECRET_KEY
- [x] DATABASE_URL
- [x] DEBUG=True
- [x] ALLOWED_HOSTS
- [x] CORS_ALLOWED_ORIGINS
- [x] CSRF_TRUSTED_ORIGINS

**Frontend (.env - Desarrollo)**
```bash
cat frontend/.env
```
Debería contener:
- [x] VITE_API_URL=http://localhost:8000/api

### 2. Configuración de Django

**backend/core/settings.py**
- [x] SSL solo en producción (DATABASE_URL configurado)
- [x] CORS y CSRF dinámicos desde .env
- [x] DEBUG dinámico desde .env
- [x] ALLOWED_HOSTS parseado desde .env

### 3. Docker Compose

**docker-compose.yml (desarrollo)**
```bash
docker compose config
```
Debería mostrar:
- [x] Servicio `db` (PostgreSQL)
- [x] Servicio `backend` (Python/Django)
- [x] Servicio `frontend` (Node/Nginx)
- [x] Volúmenes mapeados
- [x] Healthchecks configurados

### 4. Render.yaml

**render.yaml**
```bash
cat render.yaml
```
Debería contener:
- [x] Servicio backend con Docker runtime
- [x] Servicio frontend con Docker runtime
- [x] Variables de entorno correctas
- [x] Docker context y paths correctos
- [x] healthCheckPath: /health/

## Paso a Paso: Prueba Local

```bash
# 1. Verificar Docker
docker --version
docker compose --version

# 2. Construir imágenes (sin iniciar)
docker compose build

# 3. Iniciar servicios (primera vez tardará)
docker compose up

# 4. En otro terminal, verificar logs
docker compose logs -f

# 5. Verificar que está funcionando
curl http://localhost:8000/api/docs/
curl http://localhost/

# 6. Crear superusuario (si no se crea automáticamente)
docker compose exec backend python manage.py createsuperuser

# 7. Ingresar a http://localhost/admin con admin/admin123
```

## Paso a Paso: Deploy Render

```bash
# 1. Hacer push a GitHub
git add .
git commit -m "Docker configuration for Render deployment"
git push origin main

# 2. En Render.com:
#    - Conectar repositorio GitHub
#    - Crear nuevo proyecto desde GitHub
#    - Seleccionar MotoFix repo
#    - Render lee render.yaml automáticamente

# 3. Render crea servicios automáticos:
#    - motofix-backend (Docker)
#    - motofix-frontend (Docker)

# 4. Agregar PostgreSQL:
#    - Nuevo servicio > PostgreSQL
#    - Linkar como "connected service" al backend
#    - Render inyecta DATABASE_URL automáticamente

# 5. Esperar deploys:
#    - Backend: ~5-10 minutos (primera vez)
#    - Frontend: ~2-5 minutos

# 6. Verificar:
#    - Backend Health Check: OK
#    - Frontend: Ver live app
#    - API: https://backend-name.onrender.com/api/docs/
```

## Problemas Comunes y Soluciones

### "Port 80 already in use"
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Ahora accedes en localhost:8080
```

### "Cannot connect to backend from frontend"
```bash
# Verificar CORS en backend
# backend/.env debe tener:
CORS_ALLOWED_ORIGINS=http://localhost,http://localhost:3000,http://localhost:5173

# O editar manualmente:
# frontend/.env
VITE_API_URL=http://backend:8000/api  # URL interna del contenedor
```

### "Database connection error"
```bash
# Verificar que PostgreSQL esté corriendo
docker compose logs db

# Verificar DATABASE_URL
echo $DATABASE_URL

# Reiniciar todo
docker compose down -v  # Borra volúmenes
docker compose up --build
```

### "Nginx 502 Bad Gateway"
```bash
# El backend tardó en iniciar
# Esperar 30-60 segundos y refrescar

# O aumentar timeout en backend/Dockerfile:
# CMD ["sh", "-c", "... --timeout 120"]
```

## Archivos para NO hacer push a Git

```
# Ya está en .gitignore
backend/.env          # Credenciales dev
frontend/.env         # Credenciales dev
*.sqlite3             # Base de datos local
__pycache__/          # Cache Python
node_modules/         # Dependencias Node
dist/                 # Build frontend
staticfiles/          # Assets backend
venv/                 # Virtual env Python
```

## URLs Post-Deploy

**Desarrollo Local:**
- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs/
- Admin: http://localhost:8000/admin/

**Producción Render:**
- Frontend: https://motofix.onrender.com (o tu dominio)
- Backend API: https://motofix-api.onrender.com (o tu dominio)
- API Docs: https://motofix-api.onrender.com/api/docs/

## Siguientes Pasos

1. [x] Crear configuración Docker
2. [ ] Probar localmente con `docker compose up`
3. [ ] Hacer push a GitHub
4. [ ] Conectar a Render.com
5. [ ] Agregar PostgreSQL en Render
6. [ ] Configurar dominios personalizados
7. [ ] Monitorear logs en producción
8. [ ] Actualizar render.yaml con dominios reales

## Notas Importantes

- El .env nunca se sube a GitHub (.gitignore lo previene)
- Render genera SECRET_KEY automáticamente
- SSL/TLS es automático en Render
- Builds pueden tardar más la primera vez
- PostgreSQL debe estar linkado como "connected service"
- El frontend necesita reconstruirse si cambia VITE_API_URL
