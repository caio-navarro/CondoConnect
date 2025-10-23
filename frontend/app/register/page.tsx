"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2 } from "lucide-react"

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "resident" | "manager" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Building2 className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold text-primary">CondoConnect</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Criar Conta</h1>
          <p className="text-muted-foreground">Escolha o tipo de cadastro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/register/admin"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary"
          >
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center mb-2">Condomínio</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Cadastre seu condomínio e gerencie moradores e síndicos
            </p>
          </Link>

          <Link
            href="/register/resident"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary"
          >
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center mb-2">Morador</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Cadastre-se como morador do seu condomínio
            </p>
          </Link>

          <Link
            href="/register/manager"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-primary"
          >
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground text-center mb-2">Síndico</h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Cadastre-se como síndico do seu condomínio
            </p>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
