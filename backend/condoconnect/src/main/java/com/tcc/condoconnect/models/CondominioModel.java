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
public class CondominioModel {

    @Id
    private String id;
    private String codigo;
    private String nome;
    private String cnpj;
    private String email;
    private EnderecoCondominio endereco;
    @Builder.Default
    private boolean status = true;

}
