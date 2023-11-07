from django.db import models

class Employee(models.Model):
    BASIC = 'Basic'
    MEDIUM = 'Medium'
    EXPERT = 'Expert'

    SKILL_LEVEL_CHOICES = [
        (BASIC, 'Basic'),
        (MEDIUM, 'Medium'),
        (EXPERT, 'Expert'),
    ]

    PROGRAMMING_LANGUAGES = [
        ('Python', 'Python'),
        ('C#', 'C#'),
        ('PHP', 'PHP'),
    ]

    LANGUAGES = [
        ('Telugu', 'Telugu'),
        ('Tamil', 'Tamil'),
        ('English', 'English'),
    ]

    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    employee_id = models.IntegerField(unique=True)
    employee_code = models.CharField(max_length=255)
    dob = models.DateField()
    designation = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    programming_skills = models.ManyToManyField('ProgrammingLanguage', blank=True)    
    language_skills = models.ManyToManyField('Language', blank=True)
    language_skills_level = models.CharField(max_length=10, choices=SKILL_LEVEL_CHOICES, null=True, default=BASIC)


    def __str__(self):
        return f'Employee {self.employee_id}'


class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Language(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name  

