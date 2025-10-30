package com.tcc.condoconnect.dtos;

import java.time.LocalDateTime;

public record AvisoRequest(Long id, Long idSindico, Long idCondominio, String titulo, String descricao, LocalDateTime dataCriacao) {
}
