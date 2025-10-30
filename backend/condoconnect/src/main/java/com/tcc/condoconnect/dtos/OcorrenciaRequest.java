package com.tcc.condoconnect.dtos;

import java.time.LocalDateTime;

public record OcorrenciaRequest(Long id, Long idMorador, Long idCondominio, String titulo, String descricao, LocalDateTime dataCriacao) {
}
