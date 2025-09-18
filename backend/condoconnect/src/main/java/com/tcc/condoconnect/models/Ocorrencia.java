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
@Document(collection = "ocorrencias")
public class Ocorrencia {

    @Id
    private String id;
    private String idMorador; // quem registrou
    private String idCondominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private String status; // "ABERTO", "EM_ANDAMENTO", "RESOLVIDO"
    private Date dataCriacao;
}
