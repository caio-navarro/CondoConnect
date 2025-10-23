"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Plus } from "lucide-react"
import { ResidentNav } from "@/components/resident-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"

interface Incident {
  id: string
  residentId: string
  residentName: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved"
  createdAt: string
}

export default function ResidentIncidentsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", description: "" })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "resident" || !user.approved || !user.internalAddress) {
      router.push("/login")
      return
    }

    loadIncidents()
  }, [isAuthenticated, user, router])

  const loadIncidents = () => {
    const allIncidents = JSON.parse(localStorage.getItem("condoconnect_incidents") || "[]")
    const myIncidents = allIncidents.filter((i: Incident) => i.residentId === user?.id)
    setIncidents(myIncidents)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newIncident: Incident = {
      id: Math.random().toString(36).substr(2, 9),
      residentId: user!.id,
      residentName: user!.name,
      title: formData.title,
      description: formData.description,
      status: "open",
      createdAt: new Date().toISOString(),
    }

    const allIncidents = JSON.parse(localStorage.getItem("condoconnect_incidents") || "[]")
    allIncidents.push(newIncident)
    localStorage.setItem("condoconnect_incidents", JSON.stringify(allIncidents))

    setFormData({ title: "", description: "" })
    setShowForm(false)
    loadIncidents()
  }

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-500/10 text-orange-600"
      case "in-progress":
        return "bg-blue-500/10 text-blue-600"
      case "resolved":
        return "bg-green-500/10 text-green-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Aberta"
      case "in-progress":
        return "Em Andamento"
      case "resolved":
        return "Resolvida"
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Minhas Ocorrências</h1>
            <p className="text-muted-foreground">Registre e acompanhe problemas no condomínio</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Ocorrência
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Criar Nova Ocorrência</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Vazamento no banheiro"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o problema em detalhes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Criar Ocorrência</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Incidents List */}
        {incidents.length === 0 ? (
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Você ainda não criou nenhuma ocorrência</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {incidents.map((incident) => (
              <Card key={incident.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{incident.title}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(incident.status)}`}>
                    {getStatusLabel(incident.status)}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3 leading-relaxed">{incident.description}</p>
                <p className="text-sm text-muted-foreground">
                  Criada em {new Date(incident.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
