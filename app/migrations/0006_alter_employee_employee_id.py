# Generated by Django 4.2.7 on 2023-11-16 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_language_programminglanguage_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='employee_id',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
