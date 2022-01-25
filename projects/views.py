from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer, AdminRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from REST.mixins import PartialUpdateMixin
from REST.permissions import ProjectCategoryPermission
from .models import Project, TODO
from .serializers import ProjectModelSerializer, TodoModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, ToDoFilter


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(LoginRequiredMixin, PartialUpdateMixin, ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, AdminRenderer]
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter

    permission_classes = (ProjectCategoryPermission,)


class TodoModelViewSet(LoginRequiredMixin, ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TodoModelSerializer
    renderer_classes = [JSONRenderer, AdminRenderer]
    pagination_class = ToDoPagination
    filterset_class = ToDoFilter

    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        """A note is not deleted but becomes inactive"""
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        instance.is_active = False if instance.is_active else True
        instance.save()
        return Response(serializer.data)

    def perform_create(self, serializer):
        """A new todo is always created by the current user"""
        serializer.save(author=self.request.user)
