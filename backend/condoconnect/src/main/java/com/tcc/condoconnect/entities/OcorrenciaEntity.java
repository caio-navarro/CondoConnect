package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.Ocorrencia;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OcorrenciaEntity {
    private String id;
    private String idMorador; // quem registrou
    private String idCondominio; // para qual condomínio
    private String titulo;
    private String descricao;
    private String status; // "ABERTO", "EM_ANDAMENTO", "RESOLVIDO"
    private Date dataCriacao;

    public static OcorrenciaEntity toOcorrencia(Ocorrencia ocorrencia) {

        OcorrenciaEntity ocorrenciaEntity = new OcorrenciaEntity();

        ocorrenciaEntity.setId(ocorrencia.getId());
        ocorrenciaEntity.setIdMorador(ocorrencia.getIdMorador());
        ocorrenciaEntity.setIdCondominio(ocorrencia.getIdCondominio());
        ocorrenciaEntity.setTitulo(ocorrencia.getTitulo());
        ocorrenciaEntity.setDescricao(ocorrencia.getDescricao());
        ocorrenciaEntity.setStatus(ocorrencia.getStatus());
        ocorrenciaEntity.setDataCriacao(ocorrencia.getDataCriacao());

        return ocorrenciaEntity;

    }

}
