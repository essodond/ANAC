"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface DisplayData {
  counter: string
  currentTicket: string
  nextTickets: string[]
}

const DISPLAY_DATA: DisplayData[] = [
  { counter: "Comptoir 1", currentTicket: "0101", nextTickets: ["0102", "0103", "0104"] },
  { counter: "Comptoir 2", currentTicket: "0201", nextTickets: ["0202", "0203"] },
  { counter: "Comptoir 3", currentTicket: "Aucun ticket", nextTickets: [] },
]

export default function DisplayPage() {
  const [displayData, setDisplayData] = useState(DISPLAY_DATA)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayData.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [displayData.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">Affichage des Files</h1>
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/10 bg-white/10 backdrop-blur-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div key={currentIndex} className="w-full max-w-2xl animate-in fade-in duration-1000">
          <div className="bg-gradient-to-br from-purple-600/40 to-blue-600/40 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center space-y-8 border border-white/20">
            {/* Counter Name */}
            <div>
              <p className="text-purple-200 text-xl">Comptoir</p>
              <h2 className="text-5xl font-bold text-white">{displayData[currentIndex].counter}</h2>
            </div>

            {/* Current Ticket */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-12 border border-white/20">
              <p className="text-purple-100 text-lg mb-4">En Service</p>
              <p className="text-8xl font-bold text-white">{displayData[currentIndex].currentTicket}</p>
            </div>

            {/* Next Tickets */}
            {displayData[currentIndex].nextTickets.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-purple-200 text-sm mb-3">Tickets Suivants</p>
                <div className="flex justify-center gap-4">
                  {displayData[currentIndex].nextTickets.map((ticket, idx) => (
                    <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                      <p className="text-white text-3xl font-bold">{ticket}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-8">
        {displayData.map((_, idx) => (
          <div
            key={idx}
            className={`h-3 rounded-full transition-all ${idx === currentIndex ? "bg-white w-8" : "bg-white/40 w-3"}`}
          />
        ))}
      </div>
    </div>
  )
}
