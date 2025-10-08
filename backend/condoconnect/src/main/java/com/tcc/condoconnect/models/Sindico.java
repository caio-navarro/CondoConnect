package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sindicos")
public class Sindico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;

    @OneToOne
    @JoinColumn(name = "id_condominio")
    private Condominio condominio;
}