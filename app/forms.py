from django import forms
from .models import Employee, ProgrammingLanguage, Language


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['employee_id', 'employee_code', 'dob', 'designation', 'gender', 'programming_skills', 'programming_skills_level', 'language_skills', 'language_skills_level']
        widgets = {
            'dob': forms.DateInput(attrs={'type': 'date'}),
        }

    programming_skills = forms.ModelMultipleChoiceField(
        queryset=ProgrammingLanguage.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    programming_skills_level = forms.ChoiceField(
        choices=Employee.SKILL_LEVEL_CHOICES,
        required=False,
        initial=Employee.BASIC
    )

    language_skills = forms.ModelMultipleChoiceField(
        queryset=Language.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    language_skills_level = forms.ChoiceField(
        choices=Employee.SKILL_LEVEL_CHOICES,
        required=False,
        initial=Employee.BASIC
    )
