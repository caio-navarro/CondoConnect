package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.EnderecoCondominio;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoCondominioEntity {
    private String logradouro;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

    public static EnderecoCondominioEntity toEnderecoCondominio(EnderecoCondominio enderecoCondominio) {
        EnderecoCondominioEntity enderecoCondominioEntity = new EnderecoCondominioEntity();
        enderecoCondominioEntity.setLogradouro(enderecoCondominio.getLogradouro());
        enderecoCondominioEntity.setNumero(enderecoCondominio.getNumero());
        enderecoCondominioEntity.setBairro(enderecoCondominio.getBairro());
        enderecoCondominioEntity.setCidade(enderecoCondominio.getCidade());
        enderecoCondominioEntity.setEstado(enderecoCondominio.getEstado());
        enderecoCondominioEntity.setCep(enderecoCondominio.getCep());

        return enderecoCondominioEntity;
    }
}