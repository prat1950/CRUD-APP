from django.core.management.commands.runserver import Command as BaseRunserverCommand
from django.core.management import call_command

class Command(BaseRunserverCommand):
    def handle(self, *args, **options):
        # Call the populate_languages management command
        print("Custom command is being executed.")
        call_command('populate_languages')

        # Call the base runserver command
        super().handle(*args, **options)
