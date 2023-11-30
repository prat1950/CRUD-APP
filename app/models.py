from django.db import models

BASIC = 'Basic'
MEDIUM = 'Medium'
EXPERT = 'Expert'

SKILL_LEVEL_CHOICES = [
    (BASIC, 'Basic'),
    (MEDIUM, 'Medium'),
    (EXPERT, 'Expert'),
]

GENDER_CHOICES = [
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
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

class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=50, choices=PROGRAMMING_LANGUAGES)

    def __str__(self):
        return self.name

class Language(models.Model):
    name = models.CharField(max_length=50, choices=LANGUAGES)

    def __str__(self):
        return self.name  

class Employee(models.Model):
    employee_id = models.CharField(max_length=255, unique=True)
    employee_code = models.CharField(max_length=255)
    dob = models.DateField()
    designation = models.CharField(max_length=255)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    programming_skills = models.ManyToManyField(ProgrammingLanguage)    
    programming_skills_level = models.CharField(max_length=10, choices=SKILL_LEVEL_CHOICES, null=True)
    language_skills = models.ManyToManyField(Language, blank=True)
    language_skills_level = models.CharField(max_length=10, choices=SKILL_LEVEL_CHOICES, null=True)

    def __str__(self):
        return f'Employee {self.employee_id}'
