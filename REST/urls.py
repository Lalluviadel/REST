from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserCustomViewSet
from projects.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.authtoken import views

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView, TokenVerifyView,
# )

router = DefaultRouter()
router.register('users', UserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('api-token-auth/', views.obtain_auth_token),

    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),

    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
