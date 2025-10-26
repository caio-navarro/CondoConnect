"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, Clock } from "lucide-react";
import { ManagerNav } from "@/components/manager-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";

interface Ocorrencia {
  id: string;
  residentId?: string;
  residentName?: string;
  titulo: string;
  descricao: string;
  status: "pendente" | "resolvida";
  data: string;
}

export default function OcorrenciasPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "manager") {
      router.push("/login");
      return;
    }

    loadOcorrencias();
  }, [isAuthenticated, user, router]);

  const loadOcorrencias = () => {
    const allOcorrencias = JSON.parse(
      localStorage.getItem("condoconnect_ocorrencias") || "[]"
    );
    setOcorrencias(allOcorrencias);
  };

  const handleResolve = (ocorrenciaId: string) => {
    const allOcorrencias = JSON.parse(
      localStorage.getItem("condoconnect_ocorrencias") || "[]"
    );
    const updatedOcorrencias = allOcorrencias.map((occ: Ocorrencia) =>
      occ.id === ocorrenciaId ? { ...occ, status: "resolvida" } : occ
    );
    localStorage.setItem(
      "condoconnect_ocorrencias",
      JSON.stringify(updatedOcorrencias)
    );
    loadOcorrencias();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) return null;

  const pendingOcorrencias = ocorrencias.filter(
    (occ) => occ.status === "pendente"
  );
  const resolvedOcorrencias = ocorrencias.filter(
    (occ) => occ.status === "resolvida"
  );

  return (
    <ManagerNav role="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ocorrências
          </h1>
          <p className="text-muted-foreground">
            Gerencie as ocorrências reportadas pelos moradores
          </p>
        </div>

        {/* Pending Occurrences */}
        {pendingOcorrencias.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Ocorrências Pendentes
            </h2>
            <div className="grid gap-4">
              {pendingOcorrencias.map((ocorrencia) => (
                <Card key={ocorrencia.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-yellow-500/10 p-3 rounded-full flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 text-balance">
                          {ocorrencia.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {ocorrencia.descricao}
                        </p>
                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(ocorrencia.data)}</span>
                          </div>
                          {ocorrencia.residentName && (
                            <p>Reportado por: {ocorrencia.residentName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleResolve(ocorrencia.id)}
                        className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Resolver
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resolved Occurrences */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Histórico de Ocorrências
          </h2>
          {resolvedOcorrencias.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Nenhuma ocorrência resolvida ainda
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {resolvedOcorrencias.map((ocorrencia) => (
                <Card key={ocorrencia.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted p-3 rounded-full flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-foreground text-balance">
                          {ocorrencia.titulo}
                        </h3>
                        <Badge className="bg-green-500/10 text-green-600 flex-shrink-0">
                          Resolvida
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ocorrencia.descricao}
                      </p>
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(ocorrencia.data)}</span>
                        </div>
                        {ocorrencia.residentName && (
                          <p>Reportado por: {ocorrencia.residentName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ManagerNav>
  );
}
