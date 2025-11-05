package com.tcc.condoconnect.dtos;

import java.time.LocalDateTime;

public record AvisoRequest(Long id, Long idSindico, Long idCondominio, String titulo, String descricao, LocalDateTime dataCriacao) {
    public void validar(){
        if(titulo == null || titulo.length() < 6){
            throw new IllegalArgumentException("O título precisa ter ao menos 6 caracteres!");
        }
    }
}
