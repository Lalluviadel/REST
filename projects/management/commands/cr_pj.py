from django.core.management.base import BaseCommand
from projects.models import Project
from users.models import User


class Command(BaseCommand):
    """Command to fill the db with sample projects"""
    def handle(self, *args, **options):
        projects = [('Скраппер для школьного сайта',
                     'https://github.com/Lalluviadel/Methods_GB/tree/School_scrapper', ['JarWinter', 'LinkedPark']),
                    ('Сайт для тренировок теории',
                    'https://github.com/Lalluviadel/interview_quiz', ['LinkedPark', 'drf'])]

        for project in projects:

            users = User.objects.filter(username__in=project[2])
            instance = Project.objects.create(name=project[0], prj_url=project[1])
            instance.users.set(users)
