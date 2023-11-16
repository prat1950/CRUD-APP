# Generated by Django 4.2.7 on 2023-11-16 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_employee_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='language',
            name='name',
            field=models.CharField(choices=[('Telugu', 'Telugu'), ('Tamil', 'Tamil'), ('English', 'English')], max_length=50),
        ),
        migrations.AlterField(
            model_name='programminglanguage',
            name='name',
            field=models.CharField(choices=[('Python', 'Python'), ('C#', 'C#'), ('PHP', 'PHP')], max_length=50),
        ),
    ]