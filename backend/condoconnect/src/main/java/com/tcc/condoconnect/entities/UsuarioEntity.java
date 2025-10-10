package com.tcc.condoconnect.entities;

import com.tcc.condoconnect.entities.SubEntities.Email;
import com.tcc.condoconnect.entities.SubEntities.Nome;
import com.tcc.condoconnect.entities.SubEntities.Telefone;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Sindico;
import com.tcc.condoconnect.models.Usuario;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioEntity {
    private Long id;
    private Email email = new Email();
    private Nome nome = new Nome();
    private String senha;
    private Telefone telefone = new Telefone();
    private Morador morador;
    private Sindico sindico;
    private Condominio condominio;

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

        usuarioEntity.setCondominio(usuario.getCondominio());
        usuarioEntity.setMorador(usuario.getMorador());
        usuarioEntity.setSindico(usuario.getSindico());

        return usuarioEntity;
    }

}
