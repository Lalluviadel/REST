from rest_framework.renderers import JSONRenderer, AdminRenderer

from REST.permissions import UserCategoryPermission
from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins, viewsets


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, AdminRenderer]
    permission_classes = (UserCategoryPermission,)
