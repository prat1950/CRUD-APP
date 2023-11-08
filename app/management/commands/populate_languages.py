from django.core.management.base import BaseCommand
#above is used for custom commands in django
from app.models import ProgrammingLanguage, Language

class Command(BaseCommand):
    help = 'Populate programming languages and languages'
    # The help attribute provides a description for the command that will be displayed when you run python manage.py help


    def handle(self, *args, **options):
        #entry point like main function in c++
        # Create programming languages
        ProgrammingLanguage.objects.get_or_create(name='Python')
        ProgrammingLanguage.objects.get_or_create(name='C#')
        ProgrammingLanguage.objects.get_or_create(name='PHP')

        # Create languages
        Language.objects.get_or_create(name='Telugu')
        Language.objects.get_or_create(name='Tamil')
        Language.objects.get_or_create(name='English')

        self.stdout.write(self.style.SUCCESS('Successfully populated programming languages and languages.'))
