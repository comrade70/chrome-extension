# Generated by Django 4.2.5 on 2023-10-01 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_recordedscreen_delete_video'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recordedscreen',
            name='owner',
        ),
    ]
