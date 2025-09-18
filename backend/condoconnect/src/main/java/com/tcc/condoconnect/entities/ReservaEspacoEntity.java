package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.ReservaEspaco;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservaEspacoEntity {
    private String id;
    private String idEspaco; // espaço reservado
    private String idMorador; // quem fez a reserva
    private Date dataInicio;
    private Date dataFim;
    private String status; // "PENDENTE", "APROVADO", "CANCELADO"



    public static ReservaEspacoEntity toReserva(ReservaEspaco reserva) {
        ReservaEspacoEntity reservaEspaco = new ReservaEspacoEntity();

        reservaEspaco.setId(reserva.getId());
        reservaEspaco.setIdEspaco(reserva.getIdEspaco());
        reservaEspaco.setIdMorador(reserva.getIdMorador());
        reservaEspaco.setDataInicio(reserva.getDataInicio());
        reservaEspaco.setDataFim(reserva.getDataFim());
        reservaEspaco.setStatus(reserva.getStatus());

        return reservaEspaco;

    }

}
