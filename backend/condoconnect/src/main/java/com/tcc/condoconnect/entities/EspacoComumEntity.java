package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.EspacoComum;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EspacoComumEntity {
    private Long id;
    private Nome nome = new Nome();
    private String descricao;
    private Condominio condominio;

    public static EspacoComumEntity toEspacoComum(EspacoComum espacoComum) {
        EspacoComumEntity espacoComumEntity = new EspacoComumEntity();

        espacoComumEntity.setId(espacoComum.getId());

        Nome nome = new Nome();
        nome.setNome(espacoComum.getNome());
        espacoComumEntity.setNome(nome);

        espacoComumEntity.setDescricao(espacoComum.getDescricao());

        espacoComumEntity.setCondominio(espacoComum.getCondominio());

        return espacoComumEntity;
    }
}
