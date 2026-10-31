from decouple import config
from datetime import timedelta
import dj_database_url
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = config("SECRET_KEY", default="django-insecure-dev-key-change-in-production")
DEBUG = config("DEBUG", default=True, cast=bool)

_raw_allowed = config("ALLOWED_HOSTS", default="localhost,127.0.0.1")
if _raw_allowed == "*":
    ALLOWED_HOSTS = ["*"]
else:
    ALLOWED_HOSTS = [host.strip() for host in _raw_allowed.split(",")]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",
    "drf_spectacular",
    "apps.common",
    "apps.clientes",
    "apps.motocicletas",
    "apps.ordenes",
    "apps.repuestos",
    "apps.cobros",
    "apps.reportes",
    "apps.proveedores",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

_db_config = dj_database_url.config(
    default="sqlite:///" + os.path.join(BASE_DIR, "db.sqlite3"),
    conn_max_age=600,
)

if os.getenv("DATABASE_URL", "").startswith("postgres"):
    # Production databases (Render/Neon) require SSL; local Docker Postgres does not.
    if config("ENVIRONMENT", default="development") == "production":
        _db_config["OPTIONS"] = {"sslmode": "require"}
    else:
        _db_config["OPTIONS"] = {"sslmode": "disable"}

DATABASES = {"default": _db_config}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
]

LANGUAGE_CODE = "es-ar"
TIME_ZONE = "America/Argentina/Buenos_Aires"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

_raw_cors = config("CORS_ALLOWED_ORIGINS", default="http://localhost,http://localhost:5173,http://localhost:3000")
if _raw_cors == "*":
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [origin.strip() for origin in _raw_cors.split(",")]
CORS_ALLOW_CREDENTIALS = True

_raw_csrf = config("CSRF_TRUSTED_ORIGINS", default="")
if _raw_csrf:
    CSRF_TRUSTED_ORIGINS = [x.strip() for x in _raw_csrf.split(",")]
else:
    CSRF_TRUSTED_ORIGINS = []

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# Allow unauthenticated access to schema and docs
SPECTACULAR_SETTINGS = {
    "TITLE": "MotoFix API",
    "DESCRIPTION": "API for MotoFix workshop management",
    "VERSION": "1.0.0",
    "AUTHENTICATION_CLASSES": [],  # Allow unauthenticated schema access
}
