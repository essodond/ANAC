"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, DessertIcon as PassportIcon, Briefcase, Info, Crown, Search, Accessibility } from "lucide-react"

interface Service {
  id: number;
  name: string;
  description: string;
}

export default function KioskPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/services/"); // Assurez-vous que votre backend tourne sur ce port
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = async (service: Service) => {
    setSelectedService(service);
    try {
      const response = await fetch("http://localhost:8000/api/tickets/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ service: service.id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTicketNumber(data.ticket_number);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleReset = () => {
    setSelectedService(null);
    setTicketNumber(null);
    setError(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement des services...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-1">
            <h1 className="text-5xl font-bold text-slate-900">Borne d'Enregistrement</h1>
            <p className="text-slate-600">Sélectionnez votre service</p>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="text-slate-900 border-slate-900 hover:bg-white/50 bg-white/30 backdrop-blur-md"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour
            </Button>
          </Link>
        </div>

        {ticketNumber ? (
          <div className="max-w-md mx-auto">
            <div className="glass-light rounded-3xl p-12 text-center space-y-8">
              <div className="space-y-2">
                <p className="text-slate-600 text-lg">Votre Ticket</p>
                <h2 className="text-6xl font-bold text-blue-600">{ticketNumber}</h2>
              </div>

              <div className="glass rounded-2xl p-6 space-y-3">
                <p className="text-sm text-slate-700">Service</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {selectedService?.name}
                </p>
              </div>

              <div className="bg-green-500/20 backdrop-blur-md rounded-xl p-4 border border-green-400/30">
                <p className="text-green-800 font-semibold">Ticket émis avec succès!</p>
                <p className="text-sm text-green-700">Veuillez vous diriger vers le comptoir</p>
              </div>

              <Button
                onClick={handleReset}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl"
              >
                Émettre un Autre Ticket
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              // Déterminer l'icône et la couleur en fonction du nom du service
              let IconComponent;
              let colorClass;
              switch (service.name) {
                case "Enregistrement":
                  IconComponent = PassportIcon;
                  colorClass = "from-blue-500 to-blue-600";
                  break;
                case "Réclamation Bagages":
                  IconComponent = Briefcase;
                  colorClass = "from-green-500 to-green-600";
                  break;
                case "Information":
                  IconComponent = Info;
                  colorClass = "from-yellow-500 to-yellow-600";
                  break;
                case "Service VIP":
                  IconComponent = Crown;
                  colorClass = "from-purple-500 to-purple-600";
                  break;
                case "Objets Trouvés":
                  IconComponent = Search;
                  colorClass = "from-red-500 to-red-600";
                  break;
                case "Accessibilité":
                  IconComponent = Accessibility;
                  colorClass = "from-orange-500 to-orange-600";
                  break;
                default:
                  IconComponent = Info; // Icône par défaut
                  colorClass = "from-gray-500 to-gray-600"; // Couleur par défaut
              }

              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`bg-gradient-to-br ${colorClass} rounded-2xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group backdrop-blur-sm`}
                >
                  <div className="space-y-4">
                    <IconComponent className="h-16 w-16 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold">{service.name}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}