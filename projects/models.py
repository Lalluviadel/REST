from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(blank=True)
    users = models.ManyToManyField(User, related_name='users')

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.body}\nАвтор: {self.author}'
