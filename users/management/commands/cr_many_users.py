from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import User
from mimesis import Person
from mimesis.locales import Locale


class Command(BaseCommand):
    """Command to fill the db with MANY sample users"""
    def handle(self, *args, **options):

        for i in range(1, 150):
            user = Person(Locale.RU)
            User.objects.create_user(username=user.username(),
                                     first_name=user.first_name(),
                                     last_name=user.last_name(),
                                     email=user.email(),
                                     password=user.password())
