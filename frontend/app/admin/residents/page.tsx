"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X, User } from "lucide-react"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

interface Resident {
  id: string
  name: string
  email: string
  cpf: string
  approved: boolean
  internalAddress?: string
}

export default function AdminResidentsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [residents, setResidents] = useState<Resident[]>([])

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
      return
    }

    loadResidents()
  }, [isAuthenticated, user, router])

  const loadResidents = () => {
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const residentsList = users.filter((u: any) => u.role === "resident" && u.condominiumCode === user?.condominiumCode)
    setResidents(residentsList)
  }

  const handleApprove = (residentId: string) => {
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === residentId ? { ...u, approved: true } : u))
    localStorage.setItem("condoconnect_users", JSON.stringify(updatedUsers))
    loadResidents()
  }

  const handleReject = (residentId: string) => {
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const updatedUsers = users.filter((u: any) => u.id !== residentId)
    localStorage.setItem("condoconnect_users", JSON.stringify(updatedUsers))
    loadResidents()
  }

  if (!user) return null

  const pendingResidents = residents.filter((r) => !r.approved)
  const approvedResidents = residents.filter((r) => r.approved)

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciar Moradores</h1>
          <p className="text-muted-foreground">Aprove ou recuse cadastros de moradores</p>
        </div>

        {/* Pending Residents */}
        {pendingResidents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Cadastros Pendentes</h2>
            <div className="grid gap-4">
              {pendingResidents.map((resident) => (
                <Card key={resident.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{resident.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{resident.email}</p>
                        <p className="text-sm text-muted-foreground">CPF: {resident.cpf}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(resident.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(resident.id)}>
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

        {/* Approved Residents */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Moradores Aprovados</h2>
          {approvedResidents.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Nenhum morador aprovado ainda</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {approvedResidents.map((resident) => (
                <Card key={resident.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{resident.name}</h3>
                        <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">Aprovado</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{resident.email}</p>
                      <p className="text-sm text-muted-foreground">CPF: {resident.cpf}</p>
                      {resident.internalAddress && (
                        <p className="text-sm text-muted-foreground mt-1">Endereço: {resident.internalAddress}</p>
                      )}
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
