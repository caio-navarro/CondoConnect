"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function CompleteProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, updateUser } = useAuth()
  const [internalAddress, setInternalAddress] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "resident") {
      router.push("/login")
      return
    }

    if (!user.approved) {
      router.push("/resident/pending")
      return
    }

    if (user.internalAddress) {
      router.push("/resident/dashboard")
    }
  }, [isAuthenticated, user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    updateUser({ internalAddress })

    setTimeout(() => {
      router.push("/resident/dashboard")
    }, 100)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Complete seu Cadastro</h1>
          <p className="text-muted-foreground">Adicione seu endereço interno no condomínio</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-green-500/10 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-600 font-medium">Cadastro aprovado!</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete seu perfil para acessar todas as funcionalidades
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="internalAddress">Endereço Interno</Label>
              <Input
                id="internalAddress"
                placeholder="Ex: Bloco A, Apto 101"
                value={internalAddress}
                onChange={(e) => setInternalAddress(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Informe seu bloco, apartamento ou casa</p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Salvando..." : "Continuar"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
