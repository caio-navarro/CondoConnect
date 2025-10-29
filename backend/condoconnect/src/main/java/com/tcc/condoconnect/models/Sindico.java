package com.tcc.condoconnect.models;

import com.tcc.condoconnect.enums.Role;
import com.tcc.condoconnect.enums.StatusUsuario;
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
    private String nome;
    private String email;
    private String telefone;
    private String senha;

    private Role role = Role.SINDICO;
    private StatusUsuario statusUsuario = StatusUsuario.PENDETE;

    @OneToOne
    @JoinColumn(name = "id_condominio")
    private Condominio condominio;
}