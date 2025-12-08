import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from api.models import Service

SERVICES_DATA = [
    {"name": "Enregistrement", "description": "Service d'enregistrement des passagers"},
    {"name": "Réclamation Bagages", "description": "Service de réclamation des bagages perdus ou endommagés"},
    {"name": "Information", "description": "Service d'information générale"},
    {"name": "Service VIP", "description": "Service dédié aux passagers VIP"},
    {"name": "Objets Trouvés", "description": "Service des objets trouvés"},
    {"name": "Accessibilité", "description": "Service d'assistance pour l'accessibilité"},
]

def create_services():
    for service_data in SERVICES_DATA:
        service, created = Service.objects.get_or_create(name=service_data["name"], defaults={"description": service_data["description"]})
        if created:
            print(f"Service '{service.name}' created.")
        else:
            print(f"Service '{service.name}' already exists.")

if __name__ == '__main__':
    create_services()
