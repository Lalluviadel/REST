from django.core.management.base import BaseCommand

from projects.models import Project
from users.models import User
from mimesis import Generic
from mimesis.locales import Locale


class Command(BaseCommand):
    """Command to fill the db with MANY sample projects"""
    def handle(self, *args, **options):
        generic = Generic(locale=Locale.RU)
        users = User.objects.filter(username__in=['LinkedPark', 'drf'])

        for i in range(1, 150):
            project = generic.text.word().capitalize()
            url = generic.internet.url()
            instance = Project.objects.create(name=project, prj_url=url)
            instance.users.set(users)
