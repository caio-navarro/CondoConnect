"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, CreditCard } from "lucide-react"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function AdminSubscriptionPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted">
      <AdminNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Assinatura</h1>
          <p className="text-muted-foreground">Gerencie seu plano e pagamento</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Plano Completo</h2>
                <p className="text-muted-foreground">Plano ativo</p>
              </div>
              <div className="bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium">Ativo</div>
            </div>

            <div className="border-t border-border pt-6 mb-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-foreground">R$ 99</span>
                <span className="text-muted-foreground">/mês</span>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Moradores ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Gestão completa de reservas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Mural de avisos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Sistema de ocorrências</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Suporte prioritário</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Próximo pagamento</span>
                <span className="font-semibold text-foreground">22 de Novembro, 2025</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted-foreground">Método de pagamento</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">•••• 4242</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Alterar Método de Pagamento
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                  Cancelar Assinatura
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Precisa de ajuda?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Entre em contato com nosso suporte para dúvidas sobre sua assinatura.
            </p>
            <Button variant="outline" size="sm">
              Contatar Suporte
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
