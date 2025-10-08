package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.EnderecoCondominio;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CondominioEntity {

    private String id;
    private String codigo;
    private Nome nome = new Nome();
    private String cnpj;
    private EnderecoCondominio endereco;
    private String status = "ativo";

    public void validar(){
        validarCnpj(this.cnpj);
    }

    public static CondominioEntity toCondominio(Condominio condominio){
        CondominioEntity condominioEntity = new CondominioEntity();

        condominioEntity.setId(condominio.getId());
        condominioEntity.setCodigo(condominio.getCodigo());

        Nome nome = new Nome();
        nome.setNome(condominio.getNome());

        condominioEntity.setCnpj(condominio.getCnpj());

        condominioEntity.setEndereco(condominio.getEndereco());
        condominioEntity.setStatus(condominio.getStatus());

        return condominioEntity;
    }


    public static String validarCnpj(String cnpj) {
        cnpj = cnpj.replaceAll("[^\\d]", "");

        if (cnpj.length() != 14 || cnpj.chars().distinct().count() == 1) {
            return "CNPJ inválido";
        }

        int[] pesos1 = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int[] pesos2 = {6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};

        int soma = 0;
        for (int i = 0; i < 12; i++) {
            soma += Character.getNumericValue(cnpj.charAt(i)) * pesos1[i];
        }
        int primeiroDigito = soma % 11;
        primeiroDigito = (primeiroDigito < 2) ? 0 : 11 - primeiroDigito;

        soma = 0;
        for (int i = 0; i < 13; i++) {
            int num = Character.getNumericValue(cnpj.charAt(i));
            int peso = pesos2[i];
            soma += num * peso;
        }
        int segundoDigito = soma % 11;
        segundoDigito = (segundoDigito < 2) ? 0 : 11 - segundoDigito;

        if (primeiroDigito != Character.getNumericValue(cnpj.charAt(12)) ||
                segundoDigito != Character.getNumericValue(cnpj.charAt(13))) {
            return "CNPJ inválido";
        }

        return null;
    }
}
