package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Usuario;
import com.tcc.condoconnect.repositories.MoradorRepository;
import com.tcc.condoconnect.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MoradorApplication {

    @Autowired
    private MoradorRepository moradorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Morador> listar() {
        return moradorRepository.findAll();
    }

    public Morador cadastrar(Morador morador, Usuario usuario) {

    }

    public void deletar(Long id) {
        moradorRepository.deleteById(id);
    }

    public Morador atualizar(Morador morador) {
        return moradorRepository.save(morador);
    }

}
