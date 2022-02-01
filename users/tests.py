from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.test import TestCase
from mimesis import Person
from mimesis.locales import Locale
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase

from .models import User
from .views import UserCustomViewSet


class TestUsersViewSet(TestCase):
    """Tests for users app with TestCase"""

    def test_unauthorized_get_users_list(self):
        """Unauthorized users should not see the list of users"""
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserCustomViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authorized_get_user_detail(self):
        """Authorized users should see any user info"""
        client = APIClient()
        admin = User.objects.create_superuser('drf', 'd@mail.ru', '1', category='AD')
        client.login(username=admin.username, password='1')

        user = Person(Locale.RU)
        test_user = User.objects.create_user(username=user.username(),
                                             first_name=user.first_name(),
                                             last_name=user.last_name(),
                                             email=user.email(),
                                             password=user.password())

        response = client.get(f'/api/users/{test_user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def test_manager_edit_user_info(self):
        """Project managers haven't access to edit user info"""
        client = APIClient()
        user_01 = Person(Locale.RU)
        auth_user = User.objects.create_user(username=user_01.username(),
                                             first_name=user_01.first_name(),
                                             last_name=user_01.last_name(),
                                             email=user_01.email(),
                                             category='PM',
                                             password='GiveMeBackMy2007')
        client.login(username=auth_user.username, password='GiveMeBackMy2007')

        user_02 = Person(Locale.RU)
        test_user = User.objects.create_user(username=user_02.username(),
                                             first_name=user_02.first_name(),
                                             last_name=user_02.last_name(),
                                             email=user_02.email(),
                                             password=user_02.password())

        response = client.put(f'/api/users/{test_user.id}/', {'first_name': 'Фродо', 'last_name': 'Беггинс'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        client.logout()


class TestUsersViewSetAPI(APITestCase):
    """Tests for users app with APITestCase"""

    def test_login_with_wrong_password(self):
        """No authorize with wrong password"""
        MyUser = get_user_model()

        test_user = mixer.blend(MyUser)
        self.client.login(username=test_user.username, password='1')
        response = self.client.get(f'/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
