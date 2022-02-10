from django.core.management.base import BaseCommand
from projects.models import Project, TODO
from users.models import User


class Command(BaseCommand):
    """Command to fill the db with sample TODOs"""
    def handle(self, *args, **options):

        todos = [('Сайт для тренировок теории', 'Авторизация, регистрация через вк и гугл', 'LinkedPark'),
                 ('Сайт для тренировок теории', 'Сделать редактирование профиля с ajax', 'drf'),
                 ('Скраппер для школьного сайта', 'Отработать ситуацию, где учителя дают 2 задания в 1 день',
                  'JarWinter')]

        for todo in todos:

            project = Project.objects.get(name=todo[0])
            user = User.objects.get(username=todo[2])
            TODO.objects.create(project=project, body=todo[1], author=user)
