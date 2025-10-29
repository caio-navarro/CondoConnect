package com.tcc.condoconnect.entities.SubEntities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nome {
    private String nome;

    public static boolean validar(String nome) {
        if(nome == null || nome.isEmpty() || nome.length() < 4) {
            return false;
        }
        return true;
    }
}
