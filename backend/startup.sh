#!/bin/bash
set -e

echo "Running database migrations..."
python manage.py migrate --noinput 2>&1 || echo "Migration warning, continuing..."

echo "Creating superuser if needed..."
python manage.py shell << 'SHELL_EOF'
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@motofix.com', 'admin123')
    print("✓ Superuser 'admin' created successfully")
else:
    print("✓ Superuser 'admin' already exists")
SHELL_EOF

echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 60 --access-logfile - --error-logfile -
