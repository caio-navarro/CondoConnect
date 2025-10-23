"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X, Shield } from "lucide-react"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

interface Manager {
  id: string
  name: string
  email: string
  cpf: string
  approved: boolean
}

export default function AdminManagersPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [managers, setManagers] = useState<Manager[]>([])

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
      return
    }

    loadManagers()
  }, [isAuthenticated, user, router])

  const loadManagers = () => {
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const managersList = users.filter((u: any) => u.role === "manager" && u.condominiumCode === user?.condominiumCode)
    setManagers(managersList)
  }

  const handleApprove = (managerId: string) => {
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === managerId ? { ...u, approved: true } : u))
    localStorage.setItem("condoconnect_users", JSON.stringify(updatedUsers))
    loadManagers()
  }

  const handleReject = (managerId: string) => {
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const updatedUsers = users.filter((u: any) => u.id !== managerId)
    localStorage.setItem("condoconnect_users", JSON.stringify(updatedUsers))
    loadManagers()
  }

  if (!user) return null

  const pendingManagers = managers.filter((m) => !m.approved)
  const approvedManagers = managers.filter((m) => m.approved)

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Síndicos</h1>
          <p className="text-muted-foreground">Aprove ou recuse cadastros de síndicos</p>
        </div>

        {/* Pending Managers */}
        {pendingManagers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Cadastros Pendentes</h2>
            <div className="grid gap-4">
              {pendingManagers.map((manager) => (
                <Card key={manager.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{manager.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{manager.email}</p>
                        <p className="text-sm text-muted-foreground">CPF: {manager.cpf}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(manager.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(manager.id)}>
                        <X className="h-4 w-4 mr-2" />
                        Recusar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Approved Managers */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Síndicos Aprovados</h2>
          {approvedManagers.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Nenhum síndico aprovado ainda</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {approvedManagers.map((manager) => (
                <Card key={manager.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{manager.name}</h3>
                        <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">Aprovado</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{manager.email}</p>
                      <p className="text-sm text-muted-foreground">CPF: {manager.cpf}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
