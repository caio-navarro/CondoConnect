package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.models.Sindico;
import com.tcc.condoconnect.models.Usuario;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SindicoEntity {
    private String id;
    private String cpf;
    private String idCondominio;


    public static SindicoEntity toSindico(Sindico sindico) {
        SindicoEntity sindicoEntity = new SindicoEntity();

        sindicoEntity.setId(sindico.getId());

        sindicoEntity.setCpf(sindico.getCpf());

        sindicoEntity.setIdCondominio(sindico.getIdCondominio());

        return sindicoEntity;

    }
}
