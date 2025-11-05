package com.tcc.condoconnect.facade;

import com.tcc.condoconnect.applications.SindicoApplication;
import com.tcc.condoconnect.dtos.UsuarioRequest;
import com.tcc.condoconnect.models.Sindico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SindicoFacade {

    @Autowired
    private SindicoApplication sindicoApplication;

    public List<Sindico> listar() {
        return sindicoApplication.listar();
    }

    public Sindico cadastrar(UsuarioRequest usuarioRequest) {

        return sindicoApplication.cadastrar(usuarioRequest);
    }

    public void deletar(Long id) {
        sindicoApplication.deletar(id);
    }

    public Sindico atualizar(Sindico sindico) {
        return sindicoApplication.atualizar(sindico);
    }
}
