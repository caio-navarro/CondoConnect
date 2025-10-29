package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Cpf;
import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.entities.SubEntities.Telefone;
import com.tcc.condoconnect.enums.Role;
import com.tcc.condoconnect.enums.StatusUsuario;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.EnderecoMorador;
import com.tcc.condoconnect.models.Morador;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MoradorEntity {

    private Long id;
    private Cpf cpf = new Cpf();
    private Nome nome = new Nome();
    private String email;
    private Telefone telefone = new Telefone();
    private String senha;
    private Condominio condominio;
    private EnderecoMorador endereco;
    private Role role = Role.MORADOR;
    private StatusUsuario statusUsuario = StatusUsuario.PENDETE;

    public static MoradorEntity toMorador(Morador morador) {
        MoradorEntity moradorEntity = new MoradorEntity();

        moradorEntity.setId(morador.getId());

        Nome nome = new Nome();
        nome.setNome(morador.getNome());
        moradorEntity.setNome(nome);

        Cpf cpf = new Cpf();
        cpf.setCpf(morador.getCpf());
        moradorEntity.setCpf(cpf);

        Telefone telefone = new Telefone();
        telefone.setTelefone(morador.getTelefone());
        moradorEntity.setTelefone(telefone);

        moradorEntity.setEmail(morador.getEmail());
        moradorEntity.setSenha(morador.getSenha());
        moradorEntity.setCondominio(morador.getCondominio());
        moradorEntity.setEndereco(morador.getEndereco());
        moradorEntity.setRole(morador.getRole());
        moradorEntity.setStatusUsuario(morador.getStatusUsuario());

        return moradorEntity;
    }

    public void validar() {
        boolean erroCpf = Cpf.validarCpf(this.cpf.getCpf());
        if(!erroCpf) {
            throw new IllegalArgumentException("CPF inválido");
        }

        boolean erroNome = Nome.validar(this.nome.getNome());
        if(!erroNome) {
            throw new IllegalArgumentException("Nome invalido");
        }

        boolean erroTelefone = Telefone.validar(this.telefone.getTelefone());
        if(!erroTelefone) {
            throw new IllegalArgumentException("Telefone precisa ter ao menos 11 caracteres!");
        }
    }
}
