package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Sindico;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SindicoEntity {
    private Long id;
    private String cpf;
    private Condominio condominio;

    public static SindicoEntity toSindico(Sindico sindico) {
        SindicoEntity sindicoEntity = new SindicoEntity();

        sindicoEntity.setId(sindico.getId());

        sindicoEntity.setCpf(sindico.getCpf());

        sindicoEntity.setCondominio(sindico.getCondominio());

        return sindicoEntity;

    }
}
