package com.tcc.condoconnect.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "reservas_espaco")
public class ReservaEspaco {

    @Id
    private String id;
    private String idEspaco; // espaço reservado
    private String idMorador; // quem fez a reserva
    private Date dataInicio;
    private Date dataFim;
    private String status; // "PENDENTE", "APROVADO", "CANCELADO"
}
