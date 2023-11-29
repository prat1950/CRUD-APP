# Generated by Django 4.2.7 on 2023-11-29 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_employee_programming_skills_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='language_skills_level',
            field=models.CharField(choices=[('Basic', 'Basic'), ('Medium', 'Medium'), ('Expert', 'Expert')], max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='programming_skills_level',
            field=models.CharField(choices=[('Basic', 'Basic'), ('Medium', 'Medium'), ('Expert', 'Expert')], max_length=10, null=True),
        ),
    ]
