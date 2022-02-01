from django.contrib.auth import get_user_model
from django.test import TestCase
from mimesis import Person
from mimesis.locales import Locale
from mixer.auto import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase

from .models import Project
from .views import ProjectModelViewSet


class TestProjectViewSet(TestCase):
    """Tests for projects app with TestCase"""

    def test_unathorized_get_project_list(self):
        """Unauthorized users should not see the list of projects"""
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestTodoViewSet(TestCase):
    """Tests for ToDos app"""

    def test_unathorized_get_todo_list(self):
        """Unauthorized users should not see the list of todos"""
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestAdminProjectViewSet(APITestCase):
    """Tests for projects app with APITestCase"""

    def test_admin_rename_project(self):
        """Admin can change any project name"""
        User = get_user_model()

        test_user = mixer.blend(User)
        project = mixer.blend(Project)
        users = User.objects.filter(id=test_user.id)
        project.users.set(users)

        admin = User.objects.create_superuser('drf', 'd@mail.ru', '1', category='AD')
        self.client.login(username=admin.username, password='1')

        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'Test project'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Test project')

        self.client.logout()

    def test_developer_rename_project(self):
        """Developers haven't access to rename project (default new user category - developers)"""
        User = get_user_model()

        user_01 = Person(Locale.RU)
        manager = User.objects.create_user(username=user_01.username(),
                                           first_name=user_01.first_name(),
                                           last_name=user_01.last_name(),
                                           email=user_01.email(),
                                           password='GiveMeBackMy2007')

        project = mixer.blend(Project)
        default_project_name = project.name

        self.client.login(username=manager.username, password='GiveMeBackMy2007')
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'Test project'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        project = Project.objects.get(id=project.id)
        self.assertEqual(default_project_name, project.name)
