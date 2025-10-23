"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare } from "lucide-react"
import { ResidentNav } from "@/components/resident-nav"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

interface Announcement {
  id: string
  managerId: string
  managerName: string
  title: string
  content: string
  createdAt: string
}

export default function ResidentBulletinPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "resident" || !user.approved || !user.internalAddress) {
      router.push("/login")
      return
    }

    loadAnnouncements()
  }, [isAuthenticated, user, router])

  const loadAnnouncements = () => {
    const allAnnouncements = JSON.parse(localStorage.getItem("condoconnect_announcements") || "[]")
    setAnnouncements(allAnnouncements)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      <ResidentNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mural de Avisos</h1>
          <p className="text-muted-foreground">Avisos e comunicados do condomínio</p>
        </div>

        {announcements.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum aviso publicado ainda</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6">
                <div className="flex items-start gap-4">
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
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
