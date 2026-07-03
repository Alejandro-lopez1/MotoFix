from django.urls import path
from .views import DashboardView, ReporteMensualView

urlpatterns = [
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    path("mensual/", ReporteMensualView.as_view(), name="reporte-mensual"),
]
