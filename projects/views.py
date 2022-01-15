from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from .serializers import ProjectModelSerializer, TodoModelSerializer

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

class TodoModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TodoModelSerializer
