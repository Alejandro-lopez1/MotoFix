from rest_framework import viewsets, mixins, filters, status
from rest_framework.response import Response
from .models import Cobro
from .serializers import CobroSerializer


class CobroViewSet(mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    queryset = Cobro.objects.select_related("orden_trabajo").all()
    serializer_class = CobroSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ["-fecha"]

    def get_queryset(self):
        qs = super().get_queryset()
        ot_id = self.request.query_params.get("orden_trabajo")
        if ot_id:
            qs = qs.filter(orden_trabajo_id=ot_id)
        return qs


