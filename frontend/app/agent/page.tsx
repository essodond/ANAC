"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Volume2, SkipForward, Phone, Clock } from "lucide-react"

interface Ticket {
  number: string
  service: string
  arrivedTime: string
  waitTime: number
  status: "waiting" | "called" | "served"
}

interface Queue {
  id: string
  counter: string
  tickets: string[]
  currentCalled: string | null
}

const INITIAL_QUEUES: Queue[] = [
  {
    id: "counter-1",
    counter: "Comptoir 1",
    tickets: ["0101", "0102", "0103", "0104", "0105"],
    currentCalled: "0101",
  },
  {
    id: "counter-2",
    counter: "Comptoir 2",
    tickets: ["0201", "0202", "0203", "0204"],
    currentCalled: "0201",
  },
  {
    id: "counter-3",
    counter: "Comptoir 3",
    tickets: ["0301", "0302", "0303"],
    currentCalled: null,
  },
]

const TICKET_DETAILS: { [key: string]: Ticket } = {
  "0101": { number: "0101", service: "Enregistrement", arrivedTime: "09:15", waitTime: 12, status: "called" },
  "0102": { number: "0102", service: "Enregistrement", arrivedTime: "09:18", waitTime: 9, status: "waiting" },
  "0103": { number: "0103", service: "Bagages", arrivedTime: "09:22", waitTime: 5, status: "waiting" },
  "0104": { number: "0104", service: "Enregistrement", arrivedTime: "09:25", waitTime: 2, status: "waiting" },
  "0105": { number: "0105", service: "Info", arrivedTime: "09:28", waitTime: 0, status: "waiting" },
  "0201": { number: "0201", service: "Bagages", arrivedTime: "09:16", waitTime: 11, status: "called" },
  "0202": { number: "0202", service: "Bagages", arrivedTime: "09:20", waitTime: 7, status: "waiting" },
  "0203": { number: "0203", service: "Enregistrement", arrivedTime: "09:24", waitTime: 3, status: "waiting" },
  "0204": { number: "0204", service: "Info", arrivedTime: "09:27", waitTime: 0, status: "waiting" },
  "0301": { number: "0301", service: "Info", arrivedTime: "09:19", waitTime: 8, status: "waiting" },
  "0302": { number: "0302", service: "Enregistrement", arrivedTime: "09:23", waitTime: 4, status: "waiting" },
  "0303": { number: "0303", service: "Bagages", arrivedTime: "09:26", waitTime: 1, status: "waiting" },
}

const ticketNumberToFrench = (ticket: string): string => {
  const digits = ticket.split("")
  const frenchDigits: { [key: string]: string } = {
    0: "zéro",
    1: "un",
    2: "deux",
    3: "trois",
    4: "quatre",
    5: "cinq",
    6: "six",
    7: "sept",
    8: "huit",
    9: "neuf",
  }
  return digits.map((d) => frenchDigits[d]).join(" ")
}

const ticketNumberToEnglish = (ticket: string): string => {
  const digits = ticket.split("")
  const englishDigits: { [key: string]: string } = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  }
  return digits.map((d) => englishDigits[d]).join(" ")
}

const getCounterNumber = (counterName: string): string => {
  const match = counterName.match(/\d+/)
  return match ? match[0] : ""
}

export default function AgentPage() {
  const [queues, setQueues] = useState<Queue[]>(INITIAL_QUEUES)
  const [selectedCounter, setSelectedCounter] = useState("counter-1")

  const currentQueue = queues.find((q) => q.id === selectedCounter)!

  const callNextTicket = () => {
    const nextIndex = currentQueue.currentCalled ? currentQueue.tickets.indexOf(currentQueue.currentCalled) + 1 : 0

    if (nextIndex < currentQueue.tickets.length) {
      const nextTicket = currentQueue.tickets[nextIndex]

      const counterNum = getCounterNumber(currentQueue.counter)
      const ticketFrench = ticketNumberToFrench(nextTicket)
      const ticketEnglish = ticketNumberToEnglish(nextTicket)

      const frenchAnnouncement = `Le ticket ${ticketFrench} est attendu au comptoir ${counterNum}`
      const englishAnnouncement = `Ticket ${ticketEnglish} is called at counter ${counterNum}`

      speak(frenchAnnouncement, "fr-FR")
      setTimeout(() => {
        speak(englishAnnouncement, "en-US")
      }, frenchAnnouncement.length * 80)

      setQueues(queues.map((q) => (q.id === selectedCounter ? { ...q, currentCalled: nextTicket } : q)))
    }
  }

  const speak = (text: string, lang = "fr-FR") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const skipTicket = () => {
    if (currentQueue.currentCalled) {
      const currentIndex = currentQueue.tickets.indexOf(currentQueue.currentCalled)
      if (currentIndex < currentQueue.tickets.length - 1) {
        const nextTicket = currentQueue.tickets[currentIndex + 1]
        setQueues(queues.map((q) => (q.id === selectedCounter ? { ...q, currentCalled: nextTicket } : q)))
      }
    }
  }

  const visibleTickets = currentQueue.tickets.slice(0, 5).map((ticketNum) => TICKET_DETAILS[ticketNum])

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-slate-900">Console Agent</h1>
            <p className="text-slate-600 text-lg mt-2">{currentQueue.counter}</p>
          </div>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="glass text-slate-900 border-slate-200 hover:glass-light bg-transparent"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div className="glass-light rounded-3xl p-12 text-center space-y-4 bg-gradient-to-br from-blue-50 to-blue-100">
            <p className="text-slate-600 text-sm font-medium uppercase tracking-widest">En service</p>
            <h2 className="text-9xl font-bold text-blue-600 tracking-tight">{currentQueue.currentCalled || "—"}</h2>
            <p className="text-slate-600 text-lg">
              {currentQueue.currentCalled
                ? `${currentQueue.tickets.length - currentQueue.tickets.indexOf(currentQueue.currentCalled) - 1} tickets en attente`
                : "Aucun ticket appelé"}
            </p>
          </div>

          <div className="glass rounded-2xl p-6 bg-slate-50 border border-slate-200">
            <h3 className="text-slate-700 text-sm font-medium uppercase tracking-widest mb-4">Files d'attente</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 px-4 text-slate-700 font-semibold">Ticket</th>
                    <th className="pb-3 px-4 text-slate-700 font-semibold">Service</th>
                    <th className="pb-3 px-4 text-slate-700 font-semibold">Arrivée</th>
                    <th className="pb-3 px-4 text-slate-700 font-semibold">Attente</th>
                    <th className="pb-3 px-4 text-slate-700 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTickets.map((ticket) => (
                    <tr
                      key={ticket.number}
                      className={`border-b border-slate-100 hover:bg-slate-100 transition-colors ${
                        currentQueue.currentCalled === ticket.number ? "bg-blue-100" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <span className="text-slate-900 font-bold text-lg">{ticket.number}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-700">{ticket.service}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-600 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {ticket.arrivedTime}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-slate-700">{ticket.waitTime} min</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            ticket.status === "called"
                              ? "bg-blue-200 text-blue-900"
                              : ticket.status === "served"
                                ? "bg-green-200 text-green-900"
                                : "bg-slate-200 text-slate-900"
                          }`}
                        >
                          {ticket.status === "called" ? "Appelé" : ticket.status === "served" ? "Servi" : "En attente"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-slate-700 text-sm font-medium uppercase tracking-widest">Comptoirs</p>
            <div className="grid grid-cols-3 gap-4">
              {queues.map((queue) => (
                <button
                  key={queue.id}
                  onClick={() => setSelectedCounter(queue.id)}
                  className={`p-4 rounded-2xl font-semibold transition-all duration-200 ${
                    selectedCounter === queue.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "glass text-slate-700 hover:glass-light hover:text-slate-900 bg-slate-100 border border-slate-200"
                  }`}
                >
                  <div className="text-lg">{queue.counter}</div>
                  <div className="text-sm opacity-75 mt-1">{queue.tickets.length} en attente</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              onClick={callNextTicket}
              className="h-20 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-green-500/30 transition-all"
            >
              <Volume2 className="mr-3 h-7 w-7" />
              Appeler
            </Button>
            <Button
              onClick={skipTicket}
              className="h-20 glass text-slate-900 border-slate-200 hover:glass-light font-semibold text-lg rounded-2xl bg-slate-100"
            >
              <SkipForward className="mr-3 h-7 w-7" />
              Ignorer
            </Button>
          </div>

          <div className="glass rounded-2xl p-6 space-y-3 bg-slate-50 border border-slate-200">
            <p className="text-slate-700 text-sm font-medium uppercase tracking-widest">Prochain ticket</p>
            <div className="flex items-center justify-between">
              <div className="text-5xl font-bold text-slate-900">
                {currentQueue.currentCalled &&
                currentQueue.tickets.indexOf(currentQueue.currentCalled) < currentQueue.tickets.length - 1
                  ? currentQueue.tickets[currentQueue.tickets.indexOf(currentQueue.currentCalled) + 1]
                  : "—"}
              </div>
              <Phone className="h-8 w-8 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
