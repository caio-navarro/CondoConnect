"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Calendar, MessageSquare } from "lucide-react"
import { ResidentNav } from "@/components/resident-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function ResidentDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState({
    myIncidents: 0,
    myReservations: 0,
    announcements: 0,
  })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "resident") {
      router.push("/login")
      return
    }

    if (!user.approved) {
      router.push("/resident/pending")
      return
    }

    if (!user.internalAddress) {
      router.push("/resident/complete-profile")
      return
    }

    // Load stats
    const incidents = JSON.parse(localStorage.getItem("condoconnect_incidents") || "[]")
    const reservations = JSON.parse(localStorage.getItem("condoconnect_reservations") || "[]")
    const announcements = JSON.parse(localStorage.getItem("condoconnect_announcements") || "[]")

    setStats({
      myIncidents: incidents.filter((i: any) => i.residentId === user.id).length,
      myReservations: reservations.filter((r: any) => r.residentId === user.id).length,
      announcements: announcements.length,
    })
  }, [isAuthenticated, user, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      <ResidentNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo, {user.name}</h1>
          <p className="text-muted-foreground">{user.internalAddress}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.myIncidents}</h3>
            <p className="text-sm text-muted-foreground">Minhas Ocorrências</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.myReservations}</h3>
            <p className="text-sm text-muted-foreground">Minhas Reservas</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.announcements}</h3>
            <p className="text-sm text-muted-foreground">Avisos no Mural</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <a href="/resident/incidents">
                <AlertCircle className="h-6 w-6" />
                <span>Criar Ocorrência</span>
              </a>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <a href="/resident/reservations">
                <Calendar className="h-6 w-6" />
                <span>Reservar Espaço</span>
              </a>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <a href="/resident/bulletin">
                <MessageSquare className="h-6 w-6" />
                <span>Ver Mural</span>
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
