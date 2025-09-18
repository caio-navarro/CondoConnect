package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.EnderecoMorador;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnderecoMoradorEntity {
    private String rua;     // rua interna do condomínio
    private String numero;  // número da casa


    public static EnderecoMoradorEntity toEnderecoMorador(EnderecoMorador enderecoMorador) {
        EnderecoMoradorEntity enderecoMoradorEntity = new EnderecoMoradorEntity();

        enderecoMoradorEntity.setRua(enderecoMoradorEntity.getRua());
        enderecoMoradorEntity.setNumero(enderecoMorador.getNumero());

        return enderecoMoradorEntity;

    }
}
