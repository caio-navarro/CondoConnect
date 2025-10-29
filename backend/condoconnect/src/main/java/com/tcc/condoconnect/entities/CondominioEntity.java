package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.entities.SubEntities.Telefone;
import com.tcc.condoconnect.enums.Role;
import com.tcc.condoconnect.enums.StatusCondominio;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.EnderecoCondominio;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CondominioEntity {

    private Long id;
    private Long codigo;
    private Nome nome = new Nome();
    private String email;
    private Telefone telefone = new Telefone();
    private String cnpj;
    private String senha;
    private EnderecoCondominio endereco;
    private Role role = Role.CONDOMINIO;
    private StatusCondominio status = StatusCondominio.ATIVO;

    public static CondominioEntity toCondominio(Condominio condominio){
        CondominioEntity condominioEntity = new CondominioEntity();

        condominioEntity.setId(condominio.getId());
        condominioEntity.setCodigo(condominio.getCodigo());
        condominioEntity.setRole(condominio.getRole());

        Nome nome = new Nome();
        nome.setNome(condominio.getNome());
        condominioEntity.setNome(nome);

        Telefone telefone = new Telefone();
        telefone.setTelefone(condominio.getTelefone());
        condominioEntity.setTelefone(telefone);

        condominioEntity.setEmail(condominio.getEmail());
        condominioEntity.setCnpj(condominio.getCnpj());
        condominioEntity.setSenha(condominio.getSenha());
        condominioEntity.setEndereco(condominio.getEndereco());
        condominioEntity.setStatus(condominio.getStatus());

        return condominioEntity;
    }

    public static boolean validarCnpj(String cnpj) {
        cnpj = cnpj.replaceAll("[^\\d]", "");

        if (cnpj.length() != 14 || cnpj.chars().distinct().count() == 1) {
            return false;
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
            return false;
        }

        return true;
    }

    public void validar() {
        boolean erroCnpj = validarCnpj(this.cnpj);
        if(!erroCnpj) {
            throw new IllegalArgumentException("CNPJ Inválido!");
        }

        boolean erroNome = Nome.validar(this.nome.getNome());
        if(!erroNome) {
            throw new IllegalArgumentException("Nome precisa ter ao menos 4 caracteres!");
        }

        boolean erroTelefone = Telefone.validar(this.telefone.getTelefone());
        if(!erroTelefone) {
            throw new IllegalArgumentException("Telefone precisa ter ao menos 11 caracteres!");
        }
    }
}
