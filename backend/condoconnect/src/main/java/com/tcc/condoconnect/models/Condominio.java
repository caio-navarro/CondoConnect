package com.tcc.condoconnect.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "condominios")
public class Condominio {

    @Id
    private String id;
    private String codigo;
    private String nome;
    private String cnpj;
    private EnderecoCondominio endereco;
    @Builder.Default
    private String status = "ativo";
}
