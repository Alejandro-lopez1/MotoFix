# ?? SSL Configuration Fix

## Problema

```
django.db.utils.OperationalError: connection to server at "db" (172.20.0.2), port 5432 
failed: server does not support SSL, but SSL was required
```

## Causa

`dj_database_url.config()` automáticamente añade `sslmode=require` a la configuración de PostgreSQL, 
pero el contenedor local de PostgreSQL no está configurado con SSL.

## Solución

### Antes (Incorrecto)
```python
_db_config = dj_database_url.config(
    default="sqlite:///" + os.path.join(BASE_DIR, "db.sqlite3"),
    conn_max_age=600,
    ssl_require=True,  # ? Fuerza SSL siempre
)
```

### Después (Correcto)
```python
_db_config = dj_database_url.config(
    default="sqlite:///" + os.path.join(BASE_DIR, "db.sqlite3"),
    conn_max_age=600,
    disable_ssl=True,  # ? Desactiva SSL por defecto
)

# Solo en producción con cloud database
if os.getenv("DATABASE_URL") and os.getenv("DATABASE_URL", "").startswith("postgres"):
    if os.getenv("ENVIRONMENT") == "production":
        _db_config["OPTIONS"] = {
            "sslmode": "require",
        }
    else:
        _db_config["OPTIONS"] = {
            "sslmode": "disable",
        }
```

## Configuración por Ambiente

| Ambiente | Database | SSL | Configuración |
|----------|----------|-----|----------------|
| Desarrollo Local | SQLite | No | `disable_ssl=True` |
| Desarrollo Docker | PostgreSQL Docker | No | `sslmode: disable` |
| Producción Render | PostgreSQL Cloud | Sí | `sslmode: require` |

## Variables de Entorno Requeridas

### Desarrollo (docker-compose.yml)
```yaml
environment:
  DATABASE_URL: postgres://motofix:motofix@db:5432/motofix
  # ENVIRONMENT not set (defaults to dev)
```

### Producción (render.yaml)
```yaml
envVars:
  - key: DATABASE_URL
    sync: false  # Linkado con PostgreSQL service
  - key: ENVIRONMENT
    value: "production"
```

## Verificación

### En desarrollo local
```bash
# Django conectará sin SSL
docker compose up

# Deberías ver en logs:
# Operations to perform:
#   Apply all migrations: admin, auth, ...
# ? Migraciones exitosas = SQL funciona
```

### En Render.com
1. Linkar PostgreSQL como "connected service"
2. Render automáticamente inyecta `DATABASE_URL`
3. Establece `ENVIRONMENT=production`
4. Django usará SSL automáticamente

## Archivos Modificados

? `backend/core/settings.py`
- Línea: `disable_ssl=True` en `dj_database_url.config()`
- Líneas: Configuración condicional de sslmode

## Próximas Ejecuciones

Docker debería conectarse correctamente ahora:

```bash
docker compose down --volumes
docker compose up --build
```

Deberías ver:
```
? motofix-db is healthy
? motofix-backend migrations applied
? motofix-frontend running on port 80
```
