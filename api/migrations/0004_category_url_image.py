# Generated by Django 5.0.4 on 2024-05-12 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='url_image',
            field=models.URLField(default='url', max_length=255),
        ),
    ]