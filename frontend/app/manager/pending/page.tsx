"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function ManagerPendingPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "manager") {
      router.push("/login")
      return
    }

    if (user.approved) {
      router.push("/manager/dashboard")
    }
  }, [isAuthenticated, user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">CondoConnect</h1>
        </div>

        <Card className="p-8 text-center">
          <div className="bg-orange-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-orange-500" />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-2">Cadastro Pendente</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Seu cadastro está aguardando aprovação do administrador do condomínio. Você receberá um email quando for
            aprovado.
          </p>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-1">Cadastrado como</p>
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-2">Síndico</p>
          </div>

          <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
            Sair
          </Button>
        </Card>
      </div>
    </div>
  )
}
