package com.tcc.condoconnect.dtos;

import java.time.LocalDateTime;

public record OcorrenciaRequest(Long id, Long idMorador, Long idCondominio, String titulo, String categoria,
        String descricao, LocalDateTime dataCriacao) {
    public void validar() {
        if (titulo == null || titulo.length() < 4) {
            throw new IllegalArgumentException("O título precisa ter ao menos 6 caracteres!");
        }
    }
}
