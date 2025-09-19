package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.Aviso;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.repositories.AvisoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AvisoApplication {

    @Autowired
    private AvisoRepository avisoRepository;

    public List<Aviso> listar() {
        return avisoRepository.findAll();
    }

    public Aviso cadastrar(Aviso aviso) {
        return avisoRepository.save(aviso);
    }

    public void deletar(String id) {
        avisoRepository.deleteById(id);
    }

    public Aviso atualizar(Aviso aviso) {
        return avisoRepository.save(aviso);
    }
}
