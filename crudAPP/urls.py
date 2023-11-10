"""
URL configuration for crudAPP project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import create_employee
from app import views
from app.views import (
    CreateEmployeeAPIView,
    EmployeeListAPIView,
    EmployeeDeleteAPIView,
    EmployeeUpdateAPIView,
)

urlpatterns = [
    path('', create_employee, name='home'),
    path('admin/', admin.site.urls),
    # path('create_employee/', create_employee, name='create_employee'),
    # path('employees/<int:pk>/delete/', views.employee_delete, name='employee_delete'),
    # path('employees/', views.employee_list_view, name='employee_list'),
    # path('employees/<int:pk>/update/', views.employee_update, name='employee_update'),
    path('api/create_employee/', CreateEmployeeAPIView.as_view(), name='create_employee_api'),
    path('api/employee_list/', EmployeeListAPIView.as_view(), name='employee_list_api'),
    path('api/employee_delete/<int:pk>/', EmployeeDeleteAPIView.as_view(), name='employee_delete_api'),
    path('api/employee_update/<int:pk>/', EmployeeUpdateAPIView.as_view(), name='employee_update_api'),
]
