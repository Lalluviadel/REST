from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.create_superuser('drf', 'd@mail.ru', '1', category='AD')
        User.objects.create_user(username='JarWinter', first_name='Jared', last_name='Leto',
                                 email='ageless@mail.ru', password='IamAgeless')
        User.objects.create_user(username='LinkedPark', first_name='Chester', last_name='Bennington',
                                 email='papercut@mail.ru', password='WhatIveDone')
        User.objects.create_user(username='ThreeDoorwaysDown', first_name='Brad', last_name='Arnold',
                                 email='alternate_rock@mail.ru', password='WhenYoureYoung')
