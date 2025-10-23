"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Plus, Trash2 } from "lucide-react"
import { ManagerNav } from "@/components/manager-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

interface Space {
  id: string
  name: string
  createdAt: string
}

export default function ManagerSpacesPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [spaces, setSpaces] = useState<Space[]>([])
  const [showForm, setShowForm] = useState(false)
  const [spaceName, setSpaceName] = useState("")

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "manager" || !user.approved) {
      router.push("/login")
      return
    }

    loadSpaces()
  }, [isAuthenticated, user, router])

  const loadSpaces = () => {
    const allSpaces = JSON.parse(localStorage.getItem("condoconnect_spaces") || "[]")
    setSpaces(allSpaces)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSpace: Space = {
      id: Math.random().toString(36).substr(2, 9),
      name: spaceName,
      createdAt: new Date().toISOString(),
    }

    const allSpaces = JSON.parse(localStorage.getItem("condoconnect_spaces") || "[]")
    allSpaces.push(newSpace)
    localStorage.setItem("condoconnect_spaces", JSON.stringify(allSpaces))

    setSpaceName("")
    setShowForm(false)
    loadSpaces()
  }

  const handleDelete = (spaceId: string) => {
    if (confirm("Tem certeza que deseja excluir este espaço?")) {
      const allSpaces = JSON.parse(localStorage.getItem("condoconnect_spaces") || "[]")
      const updatedSpaces = allSpaces.filter((s: Space) => s.id !== spaceId)
      localStorage.setItem("condoconnect_spaces", JSON.stringify(updatedSpaces))
      loadSpaces()
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      <ManagerNav />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Espaços Comuns</h1>
            <p className="text-muted-foreground">Cadastre e gerencie os espaços do condomínio</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Espaço
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Cadastrar Novo Espaço</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spaceName">Nome do Espaço</Label>
                <Input
                  id="spaceName"
                  placeholder="Ex: Piscina, Churrasqueira, Salão de Festas"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Cadastrar Espaço</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Spaces List */}
        {spaces.length === 0 ? (
          <Card className="p-8 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum espaço cadastrado ainda</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map((space) => (
              <Card key={space.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{space.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Criado em {new Date(space.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(space.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
