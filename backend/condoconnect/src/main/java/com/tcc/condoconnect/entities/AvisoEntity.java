package com.tcc.condoconnect.entities;


import com.tcc.condoconnect.models.Aviso;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Sindico;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvisoEntity {

    private Long id;
    private Sindico sindico; // quem criou
    private Condominio condominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private LocalDateTime dataCriacao;

    public static AvisoEntity toAviso(Aviso aviso) {
        AvisoEntity avisoEntity = new AvisoEntity();

        avisoEntity.setId(aviso.getId());
        avisoEntity.setSindico(aviso.getSindico());
        avisoEntity.setCondominio(aviso.getCondominio());
        avisoEntity.setTitulo(aviso.getTitulo());
        avisoEntity.setDescricao(aviso.getDescricao());
        avisoEntity.setDataCriacao(aviso.getDataCriacao());

        return avisoEntity;

    }

}
