package com.tcc.condoconnect.models;

import com.tcc.condoconnect.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "moradores")
public class Morador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "id_condominio")
    private Condominio condominio;

    @OneToOne
    @JoinColumn(name = "id_endereco")
    private EnderecoMorador endereco;

    private Role role = Role.MORADOR;
}