package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.enums.StatusReserva;
import com.tcc.condoconnect.models.EspacoComum;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.ReservaEspaco;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservaEspacoEntity {
    private Long id;
    private EspacoComum espaco; // espaço reservado
    private Morador morador; // quem fez a reserva
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private StatusReserva status = StatusReserva.PENDENTE;

    public static ReservaEspacoEntity toReserva(ReservaEspaco reserva) {
        ReservaEspacoEntity reservaEspaco = new ReservaEspacoEntity();

        reservaEspaco.setId(reserva.getId());
        reservaEspaco.setEspaco(reserva.getEspaco());
        reservaEspaco.setMorador(reserva.getMorador());
        reservaEspaco.setDataInicio(reserva.getDataInicio());
        reservaEspaco.setDataFim(reserva.getDataFim());
        reservaEspaco.setStatus(reserva.getStatus());

        return reservaEspaco;

    }

}
