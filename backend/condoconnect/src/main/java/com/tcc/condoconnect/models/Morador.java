package com.tcc.condoconnect.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "moradores")
public class Morador {

    @Id
    private String id;
    private String nome;
    private String cpf;
    private String telefone;
    private String codigoCondominio;
    private EnderecoMorador endereco;
}