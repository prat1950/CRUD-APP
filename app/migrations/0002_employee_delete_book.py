# Generated by Django 4.2.7 on 2023-11-07 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee_id', models.IntegerField(unique=True)),
                ('employee_code', models.CharField(max_length=255)),
                ('doj', models.DateField()),
                ('designation', models.CharField(max_length=255)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10)),
                ('programming_skills', models.JSONField(blank=True, choices=[('Python', [('Basic', 'Basic'), ('Medium', 'Medium'), ('Expert', 'Expert')]), ('C#', [('Basic', 'Basic'), ('Medium', 'Medium'), ('Expert', 'Expert')]), ('PHP', [('Basic', 'Basic'), ('Medium', 'Medium'), ('Expert', 'Expert')])], null=True)),
                ('language_skills', models.JSONField(blank=True, choices=[('Telugu', [('Read', 'Read'), ('Write', 'Write'), ('Speak', 'Speak')]), ('Tamil', [('Read', 'Read'), ('Write', 'Write'), ('Speak', 'Speak')]), ('English', [('Read', 'Read'), ('Write', 'Write'), ('Speak', 'Speak')])], null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Book',
        ),
    ]
