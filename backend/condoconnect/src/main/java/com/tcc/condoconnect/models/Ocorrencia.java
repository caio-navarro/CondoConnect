package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ocorrencias")
public class Ocorrencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_morador")
    private Morador morador; // quem registrou

    @ManyToOne
    @JoinColumn(name = "id_condominio")
    private Condominio condominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private String status; // "ABERTO", "EM_ANDAMENTO", "RESOLVIDO"
    private Date dataCriacao;
}
