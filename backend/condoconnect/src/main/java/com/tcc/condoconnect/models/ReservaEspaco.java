package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reserva_espaco")
public class ReservaEspaco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_espaco")
    private EspacoComum espaco; // espaço reservado

    @ManyToOne
    @JoinColumn(name = "id_morador")
    private Morador morador; // quem fez a reserva
    private Date dataInicio;
    private Date dataFim;
    private String status; // "PENDENTE", "APROVADO", "CANCELADO"
}
