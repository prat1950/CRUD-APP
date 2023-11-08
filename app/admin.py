from django.contrib import admin
from .models import Employee
from .models import ProgrammingLanguage
from .models import Language
# Register your models here.

admin.site.register(Employee)
admin.site.register(ProgrammingLanguage)
admin.site.register(Language)