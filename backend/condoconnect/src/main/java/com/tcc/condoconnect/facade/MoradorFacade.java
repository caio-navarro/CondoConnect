package com.tcc.condoconnect.facade;

import com.tcc.condoconnect.applications.MoradorApplication;
import com.tcc.condoconnect.dtos.UsuarioRequest;
import com.tcc.condoconnect.models.Morador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MoradorFacade {

    @Autowired
    private MoradorApplication moradorApplication;

    public List<Morador> listar() {
        return moradorApplication.listar();
    }

    public Morador cadastrar(UsuarioRequest request) {

        return moradorApplication.cadastrar(request);
    }

    public void deletar(Long id) {
        moradorApplication.deletar(id);
    }

    public Morador atualizar(Morador morador) {
        return moradorApplication.atualizar(morador);
    }
}
