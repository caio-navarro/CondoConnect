package com.tcc.condoconnect.entities.SubEntities;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Telefone {
    private String telefone;

    public static boolean validar(String telefone) {
        if (telefone == null || telefone.trim().isEmpty()) {
            return false;
        }

        telefone = telefone.trim();

        if (!telefone.matches("\\d+")) {
            return false;
        }

        if (telefone.length() != 11) {
            return false;
        }

        return true;
    }
}
