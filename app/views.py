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


# def create_employee(request):
#     if request.method == 'POST':
#         form = EmployeeForm(request.POST)
#         if form.is_valid():
#             form.save()
#             # Add success logic here
#     else:
#         form = EmployeeForm()
#     return render(request, 'create_employee.html', {'form': form})

# def employee_list_view(request):
#     employees=Employee.objects.all()
#     return render(request, 'employee_list.html', {'employees': employees})

# def employee_delete(request, pk):
#     employee = get_object_or_404(Employee, pk=pk)
#     employee.delete()
#     return redirect('employee_list')  # Redirect to the employee list view after deletion

# def employee_update(request, pk):
#     employee = get_object_or_404(Employee, pk=pk)
#     if request.method == 'POST':
#         form = EmployeeForm(request.POST, instance=employee)
#         if form.is_valid():
#             form.save()
#             # Add success logic here
#             return redirect('employee_list')
#     else:
#         form = EmployeeForm(instance=employee)
#     return render(request, 'create_employee.html', {'form': form})
#these above functions worked for html pages but now we need to create API and endpoints to connect to reactjs frotend

class CreateEmployeeAPIView(APIView):
    def post(self, request):
        form=EmployeeForm(request.data)
        #here I am using request.data instead of request.POST because I am using APIView
        #I am getting the data from the frontend in the form of JSON
        def serialize_errors(errors):
            return json.dumps(errors, cls=DjangoJSONEncoder)
        if form.is_valid():
            employee=form.save()
            #so then I want to serialize the data 
            serialized_data = serializers.serialize('json', [employee])
            # This line serializes the employee instance into JSON format. The serializers.serialize function is used here to convert the model instance into a format suitable for sending as a JSON response.
            return JsonResponse({'data': serialized_data})
            #I am returning the serialized data as a JSON response
        else:
            return JsonResponse({'error': 'Invalid form data', 'errors': serialize_errors(form.errors)}, status=400)            #If the form is invalid, I am returning the form errors as a JSON response

        
        
class EmployeeListAPIView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serialized_data = serializers.serialize('json', employees)

        # Retrieve choices directly from the Employee model
        gender_choices = dict(Employee.GENDER_CHOICES)
        programming_languages = list(dict(Employee.PROGRAMMING_LANGUAGES).keys())
        languages = list(dict(Employee.LANGUAGES).keys())
        skill_level_choices = dict(Employee.SKILL_LEVEL_CHOICES)

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
    def delete(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        employee.delete()
        return JsonResponse({'message': 'Employee deleted successfully'})

class EmployeeUpdateAPIView(APIView):
    def put(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        form = EmployeeForm(request.data, instance=employee)
        if form.is_valid():
            employee = form.save()
            serialized_data = serializers.serialize('json', [employee])
            return JsonResponse({'data': serialized_data})
        else:
            return JsonResponse({'error': 'Invalid form data'}, status=400)

def index(request):
    return HttpResponse("Hello, this is the root path.")




def choices(request):
    # Retrieve choices directly from the Employee model
    gender_choices = list(Employee.GENDER_CHOICES)
    programming_languages = list(Employee.PROGRAMMING_LANGUAGES)
    languages = list(Employee.LANGUAGES)
    skill_level_choices = list(Employee.SKILL_LEVEL_CHOICES)

    # Return choices as JSON response
    return JsonResponse({
        'gender_choices': gender_choices,
        'programming_languages': programming_languages,
        'languages': languages,
        'skill_level_choices': skill_level_choices,
    })