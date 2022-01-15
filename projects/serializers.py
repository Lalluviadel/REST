from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    author = StringRelatedField()
    project = StringRelatedField()

    class Meta:
        model = TODO
        fields = '__all__'

    def to_representation(self, instance):
        """Overriding the to_representation method for better date output"""
        my_representation = super().to_representation(instance)
        my_representation['created_on'] = instance.created_on.strftime("%d.%m.%Y %H:%M:%S")
        my_representation['updated_on'] = instance.updated_on.strftime("%d.%m.%Y %H:%M:%S")
        return my_representation
