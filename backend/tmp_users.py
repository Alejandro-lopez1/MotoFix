import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()
from django.conf import settings
settings.DATABASES["default"]["OPTIONS"]["sslmode"] = "require"
from django.contrib.auth import get_user_model
print(list(get_user_model().objects.values("username", "is_active", "is_superuser", "is_staff")))
