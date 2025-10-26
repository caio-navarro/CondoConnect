"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Check, X } from "lucide-react";
import { ManagerNav } from "@/components/manager-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";

interface Reservation {
  id: string;
  residentId: string;
  residentName: string;
  spaceId: string;
  spaceName: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function ManagerReservationsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "manager" || !user.approved) {
      router.push("/login");
      return;
    }

    loadReservations();
  }, [isAuthenticated, user, router]);

  const loadReservations = () => {
    const allReservations = JSON.parse(
      localStorage.getItem("condoconnect_reservations") || "[]"
    );
    setReservations(allReservations);
  };

  const handleApprove = (reservationId: string) => {
    const allReservations = JSON.parse(
      localStorage.getItem("condoconnect_reservations") || "[]"
    );
    const updatedReservations = allReservations.map((r: Reservation) =>
      r.id === reservationId ? { ...r, status: "approved" } : r
    );
    localStorage.setItem(
      "condoconnect_reservations",
      JSON.stringify(updatedReservations)
    );
    loadReservations();
  };

  const handleReject = (reservationId: string) => {
    const allReservations = JSON.parse(
      localStorage.getItem("condoconnect_reservations") || "[]"
    );
    const updatedReservations = allReservations.map((r: Reservation) =>
      r.id === reservationId ? { ...r, status: "rejected" } : r
    );
    localStorage.setItem(
      "condoconnect_reservations",
      JSON.stringify(updatedReservations)
    );
    loadReservations();
  };

  if (!user) return null;

  const pendingReservations = reservations.filter(
    (r) => r.status === "pending"
  );
  const processedReservations = reservations.filter(
    (r) => r.status !== "pending"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600";
      case "rejected":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovada";
      case "rejected":
        return "Recusada";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      <ManagerNav />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie as reservas de espaços comuns
          </p>
        </div>

        {/* Pending Reservations */}
        {pendingReservations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Reservas Pendentes
            </h2>
            <div className="grid gap-4">
              {pendingReservations.map((reservation) => (
                <Card key={reservation.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {reservation.spaceName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(reservation.date).toLocaleDateString(
                            "pt-BR"
                          )}{" "}
                          às {reservation.time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Solicitado por: {reservation.residentName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(reservation.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(reservation.id)}
                      >
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

        {/* Processed Reservations */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Histórico de Reservas
          </h2>
          {processedReservations.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhuma reserva processada ainda
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {processedReservations.map((reservation) => (
                <Card key={reservation.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-muted p-3 rounded-full">
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {reservation.spaceName}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            {getStatusLabel(reservation.status)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(reservation.date).toLocaleDateString(
                            "pt-BR"
                          )}{" "}
                          às {reservation.time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Solicitado por: {reservation.residentName}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
