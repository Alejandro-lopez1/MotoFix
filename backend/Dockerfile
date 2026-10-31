FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=core.settings

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput 2>&1 || echo "Collectstatic failed but continuing..."

# Copy and make startup script executable
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

EXPOSE 8000

CMD ["/app/startup.sh"]
