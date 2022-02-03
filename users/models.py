from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # администраторы, менеджеры проектов и разработчики
    ADMIN = 'AD'
    PROJECT_MANAGERS = 'PM'
    DEVELOPERS = 'DV'
    CATEGORY_CHOICES = [
        (ADMIN, 'Admins'),
        (PROJECT_MANAGERS, 'Project Managers'),
        (DEVELOPERS, 'Developers'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    email = models.EmailField(unique=True,
                              error_messages={'unique': "An email is already used.", })
    img = models.ImageField(blank=True)
    category = models.CharField(
        max_length=2,
        choices=CATEGORY_CHOICES,
        default=DEVELOPERS,
    )

    def __str__(self):
        return f'{self.first_name} "{self.username}" {self.last_name}'
