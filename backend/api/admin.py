from django.contrib import admin
from .models import Counter, Company, Flight, Ticket, Service
# Register your models here.

admin.site.register(Service)
admin.site.register(Counter)
admin.site.register(Company)
admin.site.register(Flight)
admin.site.register(Ticket)