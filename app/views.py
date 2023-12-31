from django.shortcuts import render
from django.http import JsonResponse
from .forms import EmployeeForm
from django.shortcuts import get_object_or_404, redirect
from .models import Employee
from .models import ProgrammingLanguage
from .models import Language
from django.core import serializers
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse
import json
from django.core.serializers.json import DjangoJSONEncoder
from .serializers import EmployeeSerializer
from .forms import EmployeeUpdateForm
from .models import (SKILL_LEVEL_CHOICES, GENDER_CHOICES, PROGRAMMING_LANGUAGES, LANGUAGES)
import json
import logging

logger = logging.getLogger(__name__)

class CreateEmployeeAPIView(APIView):
    def post(self, request):
        # Convert programming_skills names to corresponding primary keys
        programming_skills_names = request.data.getlist('programming_skills', [])
        programming_skills = ProgrammingLanguage.objects.filter(name__in=programming_skills_names)
        program=[programming.name for programming in programming_skills]

        language_skills_names = request.data.getlist('language_skills', [])
        language_skills = Language.objects.filter(name__in=language_skills_names)
        language=[language.name for language in language_skills]

        

        # Check if all programming_skills and language_skills are valid
     
        
        # Create a dictionary containing the cleaned data
        cleaned_data = {
            'employee_id': request.data.get('employee_id', ''),
            'employee_code': request.data.get('employee_code', ''),
            'dob': request.data.get('dob', ''),
            'designation': request.data.get('designation', ''),
            'gender': request.data.get('gender', ''),
            'programming_skills': program,
            'programming_skills_level': request.data.get('programming_skills_level', ''),
            'language_skills': language,
            'language_skills_level': request.data.get('language_skills_level', ''),
        }
        
        form = EmployeeForm(cleaned_data)
        
        if form.is_valid():
            
            employee = form.save()

            # Manually serialize the employee data
            serialized_data = {
                'id': employee.id,
                'employee_id': employee.employee_id,
                'employee_code': employee.employee_code,
                'dob': str(employee.dob),
                'designation': employee.designation,
                'gender': employee.gender,
                'programming_skills': program,
                'programming_skills_level': employee.programming_skills_level,
                'language_skills': language,
                'language_skills_level': employee.language_skills_level,
            }

            return JsonResponse({'data': serialized_data})
        else:
            print("invalid")
            logger.error(f'Form errors: {form.errors}')
            return JsonResponse({'error': 'Invalid form data'}, status=400)



class EmployeeListAPIView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serialized_data = serializers.serialize('json', employees)

        # Retrieve choices directly from the Employee model
        gender_choices = dict(GENDER_CHOICES)
        programming_languages = dict(PROGRAMMING_LANGUAGES)
         
        languages = dict(LANGUAGES)
        skill_level_choices = dict(SKILL_LEVEL_CHOICES)

        # Add choices to the response data
        response_data = {
            'data': serialized_data,
            'choices': {
                'gender_choices': gender_choices,
                'programming_languages': programming_languages,
                'languages': languages,
                'skill_level_choices': skill_level_choices,
            },
        }

        return JsonResponse(response_data)


class EmployeeDeleteAPIView(APIView):
    def delete(self, request, employee_id):
        print(f"Deleting employee with ID: {employee_id}")
        employee = get_object_or_404(Employee, employee_id=employee_id)
        employee.delete()
        return JsonResponse({'message': 'Employee deleted successfully'})

class EmployeeUpdateAPIView(APIView):
    def put(self, request, employee_id):
        employee = get_object_or_404(Employee, employee_id=employee_id)
        form = EmployeeUpdateForm(request.data, instance=employee)
        if form.is_valid():
            employee = form.save()
            serialized_data = serializers.serialize('json', [employee])
            return JsonResponse({'data': serialized_data})
        else:
            print(f"Form errors: {form.errors}")
            return JsonResponse({'error': 'Invalid form data'}, status=400)


def index(request):
    return HttpResponse("Hello, this is the root path.")


def choices(request):
    # Retrieve choices directly from the Employee model
    gender_choices = list(GENDER_CHOICES)
    programming_languages = list(PROGRAMMING_LANGUAGES)
    languages = list(LANGUAGES)
    skill_level_choices = list(SKILL_LEVEL_CHOICES)

    # Return choices as JSON response
    return JsonResponse({
        'gender_choices': gender_choices,
        'programming_languages': programming_languages,
        'languages': languages,
        'skill_level_choices': skill_level_choices,
    })
