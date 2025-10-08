package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "moradores")
public class Morador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cpf;
    private String codigoCondominio;

    @OneToOne
    @JoinColumn(name = "id_endereco")
    private EnderecoMorador endereco;
}