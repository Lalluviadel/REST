from random import randint

from django.core.management.base import BaseCommand
from django.db.models import Max

from projects.models import TODO, Project
from users.models import User
from mimesis import Generic
from mimesis.locales import Locale


class Command(BaseCommand):
    """Command to fill the db with MANY sample ToDoes"""
    def handle(self, *args, **options):
        generic = Generic(locale=Locale.RU)

        for i in range(1, 150):
            project = self.get_random_project
            user = User.objects.get(id=project.users.first().id)
            body = generic.text.quote()
            TODO.objects.create(project=project, body=body, author=user)

    @property
    def get_random_project(self):
        max_id = Project.objects.all().aggregate(max_id=Max("id"))['max_id']
        while True:
            pk = randint(1, max_id)
            project = Project.objects.filter(pk=pk).first()
            if project:
                return project
