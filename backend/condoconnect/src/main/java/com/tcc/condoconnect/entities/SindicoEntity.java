package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Cpf;
import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.entities.SubEntities.Telefone;
import com.tcc.condoconnect.enums.Role;
import com.tcc.condoconnect.enums.StatusUsuario;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Sindico;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SindicoEntity {
    private Long id;
    private Cpf cpf = new Cpf();
    private Nome nome = new Nome();
    private String email;
    private Telefone telefone = new Telefone();
    private String senha;
    private Condominio condominio;
    private Role role = Role.SINDICO;
    private StatusUsuario statusUsuario = StatusUsuario.PENDETE;

    public static SindicoEntity toSindico(Sindico sindico) {
        SindicoEntity sindicoEntity = new SindicoEntity();

        sindicoEntity.setId(sindico.getId());

        Nome nome = new Nome();
        nome.setNome(sindico.getNome());
        sindicoEntity.setNome(nome);

        Cpf cpf = new Cpf();
        cpf.setCpf(sindico.getCpf());
        sindicoEntity.setCpf(cpf);

        Telefone telefone = new Telefone();
        telefone.setTelefone(sindico.getTelefone());
        sindicoEntity.setTelefone(telefone);

        sindicoEntity.setEmail(sindico.getEmail());
        sindicoEntity.setSenha(sindico.getSenha());
        sindicoEntity.setCondominio(sindico.getCondominio());
        sindicoEntity.setRole(sindico.getRole());
        sindicoEntity.setStatusUsuario(sindico.getStatusUsuario());

        return sindicoEntity;
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
