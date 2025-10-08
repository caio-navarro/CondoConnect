package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "condominios")
public class Condominio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nome;
    private String cnpj;

    @OneToOne
    @JoinColumn(name = "id_endereco_condominio")
    private EnderecoCondominio endereco;
    private String status = "ativo";
}
