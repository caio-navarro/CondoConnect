"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import { ManagerNav } from "@/components/manager-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"

interface Announcement {
  id: string
  managerId: string
  managerName: string
  title: string
  content: string
  createdAt: string
}

export default function ManagerAnnouncementsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", content: "" })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "manager" || !user.approved) {
      router.push("/login")
      return
    }

    loadAnnouncements()
  }, [isAuthenticated, user, router])

  const loadAnnouncements = () => {
    const allAnnouncements = JSON.parse(localStorage.getItem("condoconnect_announcements") || "[]")
    setAnnouncements(allAnnouncements)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      managerId: user!.id,
      managerName: user!.name,
      title: formData.title,
      content: formData.content,
      createdAt: new Date().toISOString(),
    }

    const allAnnouncements = JSON.parse(localStorage.getItem("condoconnect_announcements") || "[]")
    allAnnouncements.unshift(newAnnouncement)
    localStorage.setItem("condoconnect_announcements", JSON.stringify(allAnnouncements))

    setFormData({ title: "", content: "" })
    setShowForm(false)
    loadAnnouncements()
  }

  const handleDelete = (announcementId: string) => {
    if (confirm("Tem certeza que deseja excluir este aviso?")) {
      const allAnnouncements = JSON.parse(localStorage.getItem("condoconnect_announcements") || "[]")
      const updatedAnnouncements = allAnnouncements.filter((a: Announcement) => a.id !== announcementId)
      localStorage.setItem("condoconnect_announcements", JSON.stringify(updatedAnnouncements))
      loadAnnouncements()
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      <ManagerNav />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mural de Avisos</h1>
            <p className="text-muted-foreground">Crie avisos para todos os moradores</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Aviso
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Criar Novo Aviso</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Ex: Manutenção da Piscina"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  placeholder="Escreva o conteúdo do aviso..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Publicar Aviso</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Announcements List */}
        {announcements.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum aviso publicado ainda</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{announcement.title}</h3>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{announcement.content}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Por {announcement.managerName}</span>
                        <span>•</span>
                        <span>{new Date(announcement.createdAt).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(announcement.id)}
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
