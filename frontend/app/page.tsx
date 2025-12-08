"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plane, Users, Monitor, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-blue-900">ASQS</h1>
            <p className="text-gray-600">Système de Files d'Attente Intelligent</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Link href="/kiosk" className="w-full">
              <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-lg font-semibold flex items-center justify-center gap-2">
                <Plane className="h-5 w-5" />
                Borne Passagers
              </Button>
            </Link>
            <Link href="/agent" className="w-full">
              <Button className="w-full h-16 bg-green-600 hover:bg-green-700 text-lg font-semibold flex items-center justify-center gap-2">
                <Users className="h-5 w-5" />
                Interface Agent
              </Button>
            </Link>
            <Link href="/display" className="w-full">
              <Button className="w-full h-16 bg-purple-600 hover:bg-purple-700 text-lg font-semibold flex items-center justify-center gap-2">
                <Monitor className="h-5 w-5" />
                Affichage Public
              </Button>
            </Link>
            <Link href="/supervisor" className="w-full">
              <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-lg font-semibold flex items-center justify-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Tableau de Bord
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 text-center">Environnement de Test - Données Statiques</p>
        </div>
      </div>
    </div>
  )
}
