from django.db import models
from django.utils import timezone


# ============================
#        SERVICE
# ============================

class Service(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ["name"]

    def __str__(self):
        return self.name


# ============================
#        COUNTER
# ============================

class Counter(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Comptoir"
        verbose_name_plural = "Comptoirs"
        ordering = ["name"]

    def __str__(self):
        return self.name


# ============================
#        COMPANY
# ============================

class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    code = models.CharField(max_length=10, blank=True, null=True)  # IATA/ICAO
    logo_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Compagnie aérienne"
        verbose_name_plural = "Compagnies aériennes"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.code})" if self.code else self.name


# ============================
#        FLIGHT
# ============================

class Flight(models.Model):
    STATUS_CHOICES = [
        ("ON_TIME", "À l'heure"),
        ("DELAYED", "Retardé"),
        ("CANCELLED", "Annulé"),
        ("BOARDING", "Embarquement"),
    ]

    flight_number = models.CharField(max_length=20)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="flights")

    departure_airport = models.CharField(max_length=10)
    arrival_airport = models.CharField(max_length=10)

    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="ON_TIME")
    gate = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        verbose_name = "Vol"
        verbose_name_plural = "Vols"
        ordering = ["departure_time"]

    def __str__(self):
        return f"{self.flight_number} - {self.company.name}"


# ============================
#        TICKET
# ============================

class Ticket(models.Model):
    STATUS_CHOICES = [
        ("WAITING", "En attente"),
        ("CALLED", "Appelé"),
        ("DONE", "Terminé"),
        ("CANCELLED", "Annulé"),
    ]

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="tickets")
    ticket_number = models.CharField(max_length=10)


    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="WAITING")
    called_at = models.DateTimeField(blank=True, null=True)

    counter = models.ForeignKey(Counter, on_delete=models.SET_NULL, null=True, blank=True, related_name="tickets")

    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.ticket_number} - {self.service.name}"

    def call(self, counter: Counter):
        """Met à jour les infos quand le ticket est appelé."""
        self.status = "CALLED"
        self.called_at = timezone.now()
        self.counter = counter
        self.save()
