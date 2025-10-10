package com.tcc.condoconnect.models;

import com.tcc.condoconnect.enums.Role;
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

    private Role role = Role.SINDICO;

    @OneToOne
    @JoinColumn(name = "id_condominio")
    private Condominio condominio;
}