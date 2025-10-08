package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "avisos")
public class Aviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_sindico")
    private Sindico sindico; // quem criou

    @ManyToOne
    @JoinColumn(name = "id_sindico")
    private Condominio condominio; // para qual condomínio

    private String titulo;
    private String descricao;
    private LocalDateTime dataCriacao;
}
