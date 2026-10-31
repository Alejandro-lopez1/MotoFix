# ?? Guía de Despliegue - MotoFix

## Desarrollo Local con Docker

### Requisitos
- Docker
- Docker Compose

### Pasos

1. **Verificar que los archivos de configuración existan:**
   ```bash
   ls -la backend/.env
   ls -la frontend/.env
   ```

2. **Construir y ejecutar con Docker Compose:**
   ```bash
   docker compose up --build
   ```

3. **Acceder a la aplicación:**
   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs/
   - Admin Panel: http://localhost:8000/admin/

4. **Credenciales por defecto:**
   - Usuario: `admin`
   - Contraseña: `admin123`

---

## Despliegue en Render

### Requisitos
- Cuenta en Render.com
- Repositorio en GitHub

### Pasos

1. **Conectar repositorio a Render:**
   - Ve a https://render.com
   - Conecta tu cuenta GitHub
   - Selecciona el repositorio MotoFix

2. **Crear servicios desde render.yaml:**
   - Render automáticamente lee el archivo `render.yaml`
   - Se crearán dos servicios web: backend y frontend

3. **Configurar variables de entorno en Render:**

   **Backend (`motofix-backend`):**
   - `SECRET_KEY`: Generado automáticamente por Render
   - `DEBUG`: False
   - `ENVIRONMENT`: production
   - `ALLOWED_HOSTS`: motofix-backend.onrender.com (será reemplazado por tu dominio)
   - `DATABASE_URL`: Postgresql de Render (linked service)
   - `CORS_ALLOWED_ORIGINS`: https://tu-frontend.onrender.com
   - `CSRF_TRUSTED_ORIGINS`: https://tu-backend.onrender.com,https://tu-frontend.onrender.com

   **Frontend (`motofix-frontend`):**
   - `VITE_API_URL`: https://tu-backend.onrender.com/api

4. **Agregar base de datos PostgreSQL:**
   - En Render, crear un nuevo servicio PostgreSQL
   - Conectar como "linked service" al backend
   - Render automáticamente inyectará `DATABASE_URL`

5. **Actualizar render.yaml con tus dominios:**
   - Reemplazar `motofix-backend.onrender.com` con tu dominio real
   - Reemplazar `motofix-frontend.onrender.com` con tu dominio real
   - Reemplazar `VITE_API_URL` con tu URL del backend

6. **Deploy automático:**
   - Cada push a main/master triggers un nuevo deploy
   - Monitorear logs en el dashboard de Render

### Troubleshooting

**Problema: El frontend no puede conectarse al backend**
- Verificar que `VITE_API_URL` esté configurado correctamente
- Verificar CORS settings en el backend
- Revisar logs del frontend en Render

**Problema: Errores de migración de base de datos**
- Verificar que `DATABASE_URL` esté configurado
- Revisar logs del backend: "Application Logs" en Render
- Posible solución: Re-deploy con "Clear Build Cache"

**Problema: 502 Bad Gateway**
- El backend tardó demasiado en iniciar
- Aumentar el timeout en gunicorn (ya está en 60s)
- Revisar uso de memoria y CPU

---

## Variables de Entorno Importantes

### Backend (.env)
```
SECRET_KEY=tu-clave-secreta-muy-larga
DATABASE_URL=postgres://usuario:contraseña@host:puerto/basedatos
DEBUG=False (en producción)
ENVIRONMENT=production
ALLOWED_HOSTS=tu-dominio.com,www.tu-dominio.com
CORS_ALLOWED_ORIGINS=https://tu-frontend.onrender.com
CSRF_TRUSTED_ORIGINS=https://tu-backend.onrender.com,https://tu-frontend.onrender.com
```

### Frontend (.env)
```
VITE_API_URL=https://tu-backend.onrender.com/api
```

---

## Configuración de SSL/TLS

Render proporciona SSL gratis. La configuración automática ocurre cuando:
1. Vinculas un dominio personalizado
2. Renders aplica certificados Let'sEncrypt automáticamente

---

## Rollback

Si algo falla después de un deploy:
1. Ir al dashboard de Render
2. Seleccionar el servicio
3. En "Deployments", seleccionar un deploy anterior
4. Click en "Rollback"

---

## Monitoreo

Revisar regularmente:
- **Logs**: Application Logs en cada servicio
- **Métricas**: Monitorear CPU, memoria, red
- **Errores**: 5xx errors en Render dashboard

---

## Actualización de Código

1. Hacer cambios en el repositorio local
2. Commit y push a main/master
3. Render automáticamente inicia el deploy
4. Esperar a que ambos servicios (backend y frontend) estén "Live"
