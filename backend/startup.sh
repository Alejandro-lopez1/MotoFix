#!/bin/bash
set -e

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Creating superuser if configured..."
python manage.py shell << 'SHELL_EOF'
import os
from django.contrib.auth import get_user_model

password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")
if not password:
    print("Skipping superuser creation: DJANGO_SUPERUSER_PASSWORD not set")
else:
    username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
    email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@motofix.com")
    User = get_user_model()
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"Superuser '{username}' created successfully")
    else:
        print(f"Superuser '{username}' already exists")
SHELL_EOF

echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3 --timeout 60 --access-logfile - --error-logfile -
