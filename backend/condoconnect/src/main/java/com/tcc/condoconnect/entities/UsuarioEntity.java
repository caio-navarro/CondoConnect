package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Email;
import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.entities.SubEntities.Telefone;
import com.tcc.condoconnect.models.Usuario;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioEntity {
    private String id;
    private Email email = new Email();
    private Nome nome = new Nome();
    private String senha;
    private Telefone telefone = new Telefone();
    private String role;
    private String refId;

    public static UsuarioEntity toUsuario(Usuario usuario) {
        UsuarioEntity usuarioEntity = new UsuarioEntity();


        usuarioEntity.setId(usuario.getId());

        Email email = new Email();
        email.setEmail(usuario.getEmail());

        Nome nome = new Nome();
        nome.setNome(usuario.getNome());

        usuarioEntity.setSenha(usuario.getSenha());

        Telefone telefone = new Telefone();
        telefone.setTelefone(usuario.getTelefone());

        usuarioEntity.setRole(usuario.getRole());

        usuarioEntity.setRefId(usuario.getRefId());

        return usuarioEntity;
    }

}
