"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  MessageSquare,
  AlertOctagonIcon,
} from "lucide-react";
import { ManagerNav } from "@/components/manager-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

export default function ManagerDashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalSpaces: 0,
    pendingReservations: 0,
    totalAnnouncements: 0,
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "manager") {
      router.push("/login");
      return;
    }

    if (!user.approved) {
      router.push("/manager/pending");
      return;
    }

    // Load stats
    const spaces = JSON.parse(
      localStorage.getItem("condoconnect_spaces") || "[]"
    );
    const reservations = JSON.parse(
      localStorage.getItem("condoconnect_reservations") || "[]"
    );
    const announcements = JSON.parse(
      localStorage.getItem("condoconnect_announcements") || "[]"
    );
    const occurrences = JSON.parse(
      localStorage.getItem("condoconnect_occurrence") || "[]"
    );

    setStats({
      totalSpaces: spaces.length,
      pendingReservations: reservations.filter(
        (r: any) => r.status === "pending"
      ).length,
      totalAnnouncements: announcements.length,
    });
  }, [isAuthenticated, user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted">
      <ManagerNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Painel do Síndico
          </h1>
          <p className="text-muted-foreground">Bem-vindo, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stats.totalSpaces}
            </h3>
            <p className="text-sm text-muted-foreground">Espaços Cadastrados</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stats.pendingReservations}
            </h3>
            <p className="text-sm text-muted-foreground">Reservas Pendentes</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stats.totalAnnouncements}
            </h3>
            <p className="text-sm text-muted-foreground">Avisos Publicados</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <AlertOctagonIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stats.totalAnnouncements}
            </h3>
            <p className="text-sm text-muted-foreground">Ocorrências Ativas</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Ações Rápidas
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              asChild
            >
              <a href="/manager/spaces">
                <MapPin className="h-6 w-6" />
                <span>Gerenciar Espaços</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              asChild
            >
              <a href="/manager/reservations">
                <Calendar className="h-6 w-6" />
                <span>Ver Reservas</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              asChild
            >
              <a href="/manager/ococurrences">
                <AlertOctagonIcon className="h-6 w-6" />
                <span>Ver Ocorrências</span>
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
              asChild
            >
              <a href="/manager/announcements">
                <MessageSquare className="h-6 w-6" />
                <span>Criar Aviso</span>
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
