# serializers.py
from rest_framework import serializers
from .models import Employee, ProgrammingLanguage, Language

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ['name']

class ProgrammingLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammingLanguage
        fields = ['name']

class EmployeeSerializer(serializers.ModelSerializer):
    programming_skills = ProgrammingLanguageSerializer(many=True)
    language_skills = LanguageSerializer(many=True)

    class Meta:
        model = Employee
        fields = '__all__'
