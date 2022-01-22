from rest_framework.serializers import ModelSerializer, StringRelatedField, HyperlinkedModelSerializer

from users.models import User
from .models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('url', 'id', 'name',  'users', 'prj_url')

    def to_representation(self, instance):
        my_representation = super().to_representation(instance)
        usernames = ''
        for user in my_representation['users']:
            u_name = User.objects.get(id=user).username
            usernames += u_name + ' '
        my_representation['users'] = usernames
        return my_representation


class TodoModelSerializer(HyperlinkedModelSerializer):
    author = StringRelatedField()
    # project = StringRelatedField()
    project = ProjectModelSerializer()

    class Meta:
        model = TODO
        fields = ('project', 'author', 'body', 'created_on', 'updated_on', 'is_active', 'url')

    def to_representation(self, instance):
        """Overriding the to_representation method for better is_active output"""
        my_representation = super().to_representation(instance)
        my_representation['author'] = instance.author.username
        my_representation['project'] = instance.project.name
        my_representation['is_active'] = 'В работе' if my_representation['is_active'] else 'Закрыт'
        return my_representation
