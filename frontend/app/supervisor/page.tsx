"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react"

interface CounterStats {
  id: string
  name: string
  currentTicket: string
  queued: number
  avgWaitTime: number
  served: number
  status: "active" | "idle" | "break"
}

const COUNTER_STATS: CounterStats[] = [
  { id: "1", name: "Comptoir 1", currentTicket: "0101", queued: 5, avgWaitTime: 8, served: 24, status: "active" },
  { id: "2", name: "Comptoir 2", currentTicket: "0201", queued: 4, avgWaitTime: 6, served: 28, status: "active" },
  { id: "3", name: "Comptoir 3", currentTicket: "Inactif", queued: 0, avgWaitTime: 0, served: 15, status: "idle" },
  { id: "4", name: "Comptoir 4", currentTicket: "0401", queued: 7, avgWaitTime: 12, served: 22, status: "active" },
]

export default function SupervisorPage() {
  const [stats, setStats] = useState(COUNTER_STATS)

  const totalQueued = stats.reduce((sum, s) => sum + s.queued, 0)
  const activeCounters = stats.filter((s) => s.status === "active").length
  const avgWaitTime = Math.round(stats.reduce((sum, s) => sum + s.avgWaitTime, 0) / stats.length)
  const totalServed = stats.reduce((sum, s) => sum + s.served, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "idle":
        return "bg-slate-100 text-slate-600 border-slate-200"
      case "break":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "idle":
        return "Inactif"
      case "break":
        return "Pause"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">Tableau de Bord</h1>
            <p className="text-slate-500 mt-1">Surveillance des files d'attente</p>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="text-slate-700 border-slate-300 hover:bg-slate-100 bg-transparent"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total en Attente</p>
                <p className="text-3xl font-semibold text-slate-900 mt-2">{totalQueued}</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Comptoirs Actifs</p>
                <p className="text-3xl font-semibold text-slate-900 mt-2">{activeCounters}</p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Temps Moyen</p>
                <p className="text-3xl font-semibold text-slate-900 mt-2">{avgWaitTime}m</p>
              </div>
              <div className="bg-amber-100 rounded-lg p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Traité</p>
                <p className="text-3xl font-semibold text-slate-900 mt-2">{totalServed}</p>
              </div>
              <div className="bg-violet-100 rounded-lg p-3">
                <TrendingUp className="h-6 w-6 text-violet-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Détails des Comptoirs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Comptoir</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">État</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Ticket Courant</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">En Attente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Temps Moyen</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Traité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.map((stat) => (
                  <tr key={stat.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{stat.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(stat.status)}`}
                      >
                        {getStatusLabel(stat.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{stat.currentTicket}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
                        {stat.queued}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{stat.avgWaitTime}m</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{stat.served}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
          <p className="text-sm text-amber-900 font-medium">
            Comptoir 4 : Temps d'attente élevé (12m) - Envisager d'ouvrir un guichet supplémentaire
          </p>
        </div>
      </div>
    </div>
  )
}
