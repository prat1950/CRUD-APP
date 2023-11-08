from django.http import JsonResponse
from django.core.serializers import serialize
from .models import Employee

def employee_list(request):
    employees = Employee.objects.all()
    serialized_data = serialize('json', employees)
    return JsonResponse(serialized_data, safe=False)
