package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.models.EspacoComum;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EspacoComumEntity {
    private String id;
    private Nome nome = new Nome();
    private String descricao;
    private String idCondominio;


    public static EspacoComumEntity toEspacoComum(EspacoComum espacoComum) {
        EspacoComumEntity espacoComumEntity = new EspacoComumEntity();

        espacoComumEntity.setId(espacoComum.getId());

        Nome nome = new Nome();
        nome.setNome(espacoComum.getNome());

        espacoComumEntity.setDescricao(espacoComum.getDescricao());

        espacoComumEntity.setIdCondominio(espacoComum.getIdCondominio());

        return espacoComumEntity;
    }
}
