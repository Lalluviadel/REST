from django.contrib import admin

from .models import Project, TODO


class ProjectAdmin(admin.ModelAdmin):
    filter_horizontal = ('users',)


class ToDoAdmin(admin.ModelAdmin):
    list_display = ('project', 'body', 'created_on', 'updated_on', 'author', 'is_active')
    fields = (('project', 'body'), ('created_on', 'updated_on'), ('author', 'is_active'))
    readonly_fields = ['created_on', 'updated_on']


admin.site.register(Project, ProjectAdmin)
admin.site.register(TODO, ToDoAdmin)
