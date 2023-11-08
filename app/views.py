from django.shortcuts import render
from .forms import EmployeeForm
from django.shortcuts import get_object_or_404, redirect
from .models import Employee

def create_employee(request):
    if request.method == 'POST':
        form = EmployeeForm(request.POST)
        if form.is_valid():
            form.save()
            # Add success logic here
    else:
        form = EmployeeForm()
    return render(request, 'create_employee.html', {'form': form})

def employee_list_view(request):
    employees=Employee.objects.all()
    return render(request, 'employee_list.html', {'employees': employees})

def employee_delete(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    employee.delete()
    return redirect('employee_list')  # Redirect to the employee list view after deletion

def employee_update(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    if request.method == 'POST':
        form = EmployeeForm(request.POST, instance=employee)
        if form.is_valid():
            form.save()
            # Add success logic here
            return redirect('employee_list')
    else:
        form = EmployeeForm(instance=employee)
    return render(request, 'create_employee.html', {'form': form})