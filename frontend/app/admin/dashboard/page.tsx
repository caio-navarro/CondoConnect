"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Check, Users, UserCheck, AlertCircle, CreditCard } from "lucide-react"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({
    totalResidents: 0,
    pendingResidents: 0,
    totalManagers: 0,
    pendingManagers: 0,
  })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
      return
    }

    // Calculate stats
    const users = JSON.parse(localStorage.getItem("condoconnect_users") || "[]")
    const residents = users.filter((u: any) => u.role === "resident" && u.condominiumCode === user.condominiumCode)
    const managers = users.filter((u: any) => u.role === "manager" && u.condominiumCode === user.condominiumCode)

    setStats({
      totalResidents: residents.length,
      pendingResidents: residents.filter((r: any) => !r.approved).length,
      totalManagers: managers.length,
      pendingManagers: managers.filter((m: any) => !m.approved).length,
    })
  }, [isAuthenticated, user, router])

  const copyCode = () => {
    if (user?.condominiumCode) {
      navigator.clipboard.writeText(user.condominiumCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
        </div>

        {/* Condominium Code Card */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Código do Condomínio</h2>
              <p className="text-white/80 text-sm">Compartilhe este código com moradores e síndicos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                <span className="text-2xl font-bold tracking-wider">{user.condominiumCode}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={copyCode}
                className="bg-white text-primary hover:bg-white/90"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.totalResidents}</h3>
            <p className="text-sm text-muted-foreground">Total de Moradores</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.pendingResidents}</h3>
            <p className="text-sm text-muted-foreground">Moradores Pendentes</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.totalManagers}</h3>
            <p className="text-sm text-muted-foreground">Total de Síndicos</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stats.pendingManagers}</h3>
            <p className="text-sm text-muted-foreground">Síndicos Pendentes</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <a href="/admin/residents">
                <Users className="h-6 w-6" />
                <span>Gerenciar Moradores</span>
              </a>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <a href="/admin/managers">
                <UserCheck className="h-6 w-6" />
                <span>Gerenciar Síndicos</span>
              </a>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <a href="/admin/subscription">
                <CreditCard className="h-6 w-6" />
                <span>Ver Assinatura</span>
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
