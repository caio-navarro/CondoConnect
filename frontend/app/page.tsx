import Link from "next/link"
import { Building2, Users, Calendar, MessageSquare, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">CondoConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Planos
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary-light to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Gestão de Condomínios Simplificada
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Conecte moradores, síndicos e administradores em uma única plataforma. Gerencie ocorrências, reservas e
              comunicações de forma eficiente.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/register">Cadastrar Condomínio</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                <Link href="#features">Conhecer Recursos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recursos Completos para seu Condomínio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seu condomínio em um só lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-muted rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Gestão de Moradores</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cadastre e gerencie moradores com facilidade. Aprove ou recuse cadastros de forma rápida e segura.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-muted rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Reserva de Espaços</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sistema completo de reservas para áreas comuns. Piscina, churrasqueira, salão de festas e mais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-muted rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Mural de Avisos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comunique-se com todos os moradores de forma instantânea. Avisos importantes sempre visíveis.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-muted rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Registro de Ocorrências</h3>
              <p className="text-muted-foreground leading-relaxed">
                Moradores podem reportar problemas e acompanhar o status das ocorrências em tempo real.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-muted rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Gestão de Síndicos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Controle total sobre síndicos e suas permissões. Aprove cadastros e gerencie acessos.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-muted rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Acesso Rápido</h3>
              <p className="text-muted-foreground leading-relaxed">
                Interface intuitiva e responsiva. Acesse de qualquer dispositivo, a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Plano Simples e Transparente</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Um único plano com todos os recursos que você precisa
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-primary">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Plano Completo</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-primary">R$ 99</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">Moradores ilimitados</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">Gestão completa de reservas</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">Mural de avisos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">Sistema de ocorrências</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">Suporte prioritário</span>
                </li>
              </ul>

              <Button className="w-full" size="lg" asChild>
                <Link href="/register">Começar Agora</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-xl font-bold">CondoConnect</span>
              </div>
              <p className="text-white/70 leading-relaxed">A solução completa para gestão de condomínios no Brasil.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-white/70 hover:text-white transition-colors">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-white/70 hover:text-white transition-colors">
                    Planos
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-white/70 hover:text-white transition-colors">
                    Entrar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-white/70 leading-relaxed">
                contato@condoconnect.com.br
                <br />
                (11) 9999-9999
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2025 CondoConnect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
