package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.enums.StatusOcorrencia;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Ocorrencia;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OcorrenciaEntity {
    private Long id;
    private Morador morador; // quem registrou
    private Condominio condominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private StatusOcorrencia status = StatusOcorrencia.ABERTO;
    private Date dataCriacao;

    public static OcorrenciaEntity toOcorrencia(Ocorrencia ocorrencia) {

        OcorrenciaEntity ocorrenciaEntity = new OcorrenciaEntity();

        ocorrenciaEntity.setId(ocorrencia.getId());
        ocorrenciaEntity.setMorador(ocorrencia.getMorador());
        ocorrenciaEntity.setCondominio(ocorrencia.getCondominio());
        ocorrenciaEntity.setTitulo(ocorrencia.getTitulo());
        ocorrenciaEntity.setDescricao(ocorrencia.getDescricao());
        ocorrenciaEntity.setStatus(ocorrencia.getStatus());
        ocorrenciaEntity.setDataCriacao(ocorrencia.getDataCriacao());
        ocorrenciaEntity.setStatus(ocorrencia.getStatus());

        return ocorrenciaEntity;

    }

}
