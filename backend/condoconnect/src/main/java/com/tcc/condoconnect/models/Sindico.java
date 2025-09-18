package com.tcc.condoconnect.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "sindicos")
public class Sindico {

    @Id
    private String id;
    private String idSindico; // quem criou
    private String idCondominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private Date dataCriacao;
}
