package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String telefone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_morador")
    private Morador morador;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_sindico")
    private Sindico sindico;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_condominio")
    private Condominio condominio;
}