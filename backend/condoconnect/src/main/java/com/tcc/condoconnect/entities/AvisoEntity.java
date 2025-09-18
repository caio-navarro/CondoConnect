package com.tcc.condoconnect.entities;


import com.tcc.condoconnect.models.Aviso;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvisoEntity {

    private String id;
    private String idSindico; // quem criou
    private String idCondominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private Date dataCriacao;

    public static AvisoEntity toAviso(Aviso aviso) {
        AvisoEntity avisoEntity = new AvisoEntity();

        avisoEntity.setId(aviso.getId());
        avisoEntity.setIdSindico(aviso.getIdSindico());
        avisoEntity.setIdCondominio(aviso.getIdCondominio());
        avisoEntity.setTitulo(aviso.getTitulo());
        avisoEntity.setDescricao(aviso.getDescricao());
        avisoEntity.setDataCriacao(aviso.getDataCriacao());

        return avisoEntity;

    }

}
