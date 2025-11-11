import React from "react";
import { PieChart, MessageCircle, Shield, TrendingUp } from "lucide-react";
import { ReactDOM } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

export default function CondoConnect() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Header/Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded"></div>
          </div>
          <span className="text-xl font-semibold tracking-wide">
            CONDOCONNECT
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a href="#" className="text-sm hover:text-blue-200 transition">
            Início
          </a>
          <a href="#" className="text-sm hover:text-blue-200 transition">
            Funcionalidades
          </a>
          <a href="#" className="text-sm hover:text-blue-200 transition">
            Sobre
          </a>
          <a href="#" className="text-sm hover:text-blue-200 transition">
            Contato
          </a>
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md text-sm font-medium transition">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Gestão condominial simples, moderna e eficiente.
          </h1>
          <p className="text-lg text-blue-200 mb-8">
            Conecta síndicos, administradores e moradores em um só lugar.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-md font-medium transition">
              Cadastre-se
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-md font-medium transition">
              Saiba Mais
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="relative">
            {/* Buildings illustration */}
            <div className="flex gap-4 items-end">
              {/* Left building */}
              <div className="w-32 h-64 bg-blue-600 rounded-t-lg relative">
                <div className="grid grid-cols-3 gap-2 p-3">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-3 bg-blue-400 rounded-sm"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Right building */}
              <div className="w-40 h-48 bg-blue-500 rounded-t-lg relative opacity-80">
                <div className="grid grid-cols-4 gap-2 p-3">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-3 bg-blue-300 rounded-sm"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Houses icon on top */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2">
                <div className="w-12 h-12 border-4 border-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 border-b-4 border-l-2 border-r-2 border-white"></div>
                </div>
                <div className="w-10 h-10 border-4 border-white rounded-lg flex items-center justify-center opacity-75">
                  <div className="w-5 h-5 border-b-4 border-l-2 border-r-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section className="container mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Funcionalidades
        </h2>

        <div className="grid md:grid-cols-4 gap-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <PieChart size={64} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg">Gestão financeira</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <MessageCircle size={64} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg">Comunicação rápida</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <Shield size={64} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg">Segurança de dados</h3>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <TrendingUp size={64} strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg">
              Transparência para moradores
            </h3>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section className="container mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Sobre o CondoConnect</h2>
        <p className="text-lg text-blue-200 max-w-2xl mx-auto">
          Nosso objetivo é simplificar a vida dos síndicos e moradores com
          tecnologia intuitiva e confiável.
        </p>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Pronto para transformar a gestão do seu condomínio?
        </h2>
        <button className="bg-blue-500 hover:bg-blue-600 px-10 py-4 rounded-md font-medium text-lg transition">
          Comece Agora
        </button>
      </section>
    </div>
  );
}
