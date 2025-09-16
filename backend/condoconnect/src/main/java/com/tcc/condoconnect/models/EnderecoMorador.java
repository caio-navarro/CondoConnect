package com.tcc.condoconnect.models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnderecoMorador {
    private String rua;     // rua interna do condomínio
    private String numero;  // número da casa
}
