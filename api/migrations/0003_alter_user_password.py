# Generated by Django 5.0.4 on 2024-05-08 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_user_name_user_created_at_user_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=128, verbose_name='password'),
        ),
    ]