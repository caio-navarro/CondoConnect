package com.tcc.condoconnect.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "espacos_comum")
public class EspacoComum {

    @Id
    private String id;
    private String nome;
    private String descricao;
    private String idCondominio;
}
