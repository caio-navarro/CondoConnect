package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.EnderecoMorador;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoMoradorEntity {
    private Long id;
    private String rua;     // rua interna do condomínio
    private String numero;  // número da casa


    public static EnderecoMoradorEntity toEnderecoMorador(EnderecoMorador enderecoMorador) {
        EnderecoMoradorEntity enderecoMoradorEntity = new EnderecoMoradorEntity();
        enderecoMoradorEntity.setId(enderecoMorador.getId());
        enderecoMoradorEntity.setRua(enderecoMoradorEntity.getRua());
        enderecoMoradorEntity.setNumero(enderecoMorador.getNumero());

        return enderecoMoradorEntity;

    }
}
