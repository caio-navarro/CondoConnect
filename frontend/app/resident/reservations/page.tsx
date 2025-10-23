"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Plus } from "lucide-react"
import { ResidentNav } from "@/components/resident-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

interface Space {
  id: string
  name: string
}

interface Reservation {
  id: string
  residentId: string
  residentName: string
  spaceId: string
  spaceName: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function ResidentReservationsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [spaces, setSpaces] = useState<Space[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ spaceId: "", date: "", time: "" })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "resident" || !user.approved || !user.internalAddress) {
      router.push("/login")
      return
    }

    loadReservations()
    loadSpaces()
  }, [isAuthenticated, user, router])

  const loadReservations = () => {
    const allReservations = JSON.parse(localStorage.getItem("condoconnect_reservations") || "[]")
    const myReservations = allReservations.filter((r: Reservation) => r.residentId === user?.id)
    setReservations(myReservations)
  }

  const loadSpaces = () => {
    const allSpaces = JSON.parse(localStorage.getItem("condoconnect_spaces") || "[]")
    setSpaces(allSpaces)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedSpace = spaces.find((s) => s.id === formData.spaceId)

    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      residentId: user!.id,
      residentName: user!.name,
      spaceId: formData.spaceId,
      spaceName: selectedSpace?.name || "",
      date: formData.date,
      time: formData.time,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const allReservations = JSON.parse(localStorage.getItem("condoconnect_reservations") || "[]")
    allReservations.push(newReservation)
    localStorage.setItem("condoconnect_reservations", JSON.stringify(allReservations))

    setFormData({ spaceId: "", date: "", time: "" })
    setShowForm(false)
    loadReservations()
  }

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500/10 text-orange-600"
      case "approved":
        return "bg-green-500/10 text-green-600"
      case "rejected":
        return "bg-red-500/10 text-red-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "approved":
        return "Aprovada"
      case "rejected":
        return "Recusada"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-muted">
      <ResidentNav />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Minhas Reservas</h1>
            <p className="text-muted-foreground">Reserve espaços comuns do condomínio</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} disabled={spaces.length === 0}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Reserva
          </Button>
        </div>

        {spaces.length === 0 && (
          <Card className="p-6 mb-8 bg-orange-500/10 border-orange-500/20">
            <p className="text-sm text-orange-600">
              Nenhum espaço disponível para reserva. Aguarde o síndico cadastrar os espaços comuns.
            </p>
          </Card>
        )}

        {/* Create Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Criar Nova Reserva</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spaceId">Espaço</Label>
                <select
                  id="spaceId"
                  value={formData.spaceId}
                  onChange={(e) => setFormData({ ...formData, spaceId: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  required
                >
                  <option value="">Selecione um espaço</option>
                  {spaces.map((space) => (
                    <option key={space.id} value={space.id}>
                      {space.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Criar Reserva</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Reservations List */}
        {reservations.length === 0 ? (
          <Card className="p-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Você ainda não fez nenhuma reserva</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{reservation.spaceName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(reservation.date).toLocaleDateString("pt-BR")} às {reservation.time}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(reservation.status)}`}>
                    {getStatusLabel(reservation.status)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
