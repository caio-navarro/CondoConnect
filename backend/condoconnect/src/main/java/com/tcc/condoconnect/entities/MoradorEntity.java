package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.models.EnderecoMorador;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MoradorEntity {

    private String id;
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String codigoCondominio;
    private EnderecoMorador endereco;

    public void validar(){
        validarCpf(this.cpf);
    }

    public static String validarCpf(String cpf) {
        cpf = cpf.replaceAll("[^\\d]", "");

        if (cpf.length() != 11 || cpf.chars().distinct().count() == 1) {
            return "CPF inválido";
        }

        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }
        int primeiroDigito = 11 - (soma % 11);
        if (primeiroDigito >= 10) primeiroDigito = 0;


        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }
        int segundoDigito = 11 - (soma % 11);
        if (segundoDigito >= 10) segundoDigito = 0;


        if (primeiroDigito != Character.getNumericValue(cpf.charAt(9)) ||
                segundoDigito != Character.getNumericValue(cpf.charAt(10))) {
            return "CPF inválido";
        }

        return null;
    }
}
