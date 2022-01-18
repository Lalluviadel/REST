from django_filters import rest_framework as filters, DateFromToRangeFilter
from django_filters.widgets import RangeWidget

from .models import Project, TODO


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains', label='Название проекта содержит:')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):

    created_on = DateFromToRangeFilter(widget=RangeWidget(attrs={'placeholder': 'ДД.ММ.ГГГГ'}),
                                       label=('Дата создания (введите начальную и конечную дату в '
                                              'указанном формате):'))
    project__name = filters.CharFilter(lookup_expr='contains', label='Название проекта содержит:')
    body = filters.CharFilter(lookup_expr='contains', label='Заметка содержит:')

    class Meta:
        model = TODO
        fields = ['project__name', 'body']
