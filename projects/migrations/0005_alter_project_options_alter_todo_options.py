# Generated by Django 4.0 on 2022-01-25 17:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_rename_url_project_prj_url'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='project',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ['-updated_on']},
        ),
    ]
