package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.EspacoComum;
import com.tcc.condoconnect.repositories.EspacoComumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EspacoComumApplication {

    @Autowired
    private EspacoComumRepository espacoComumRepository;

    public List<EspacoComum> listar() {
        return espacoComumRepository.findAll();
    }

    public EspacoComum cadastrar(EspacoComum espacoComum) {
        return espacoComumRepository.save(espacoComum);
    }

    public void deletar(String id) {
        espacoComumRepository.deleteById(id);
    }

    public EspacoComum atualizar(EspacoComum espacoComum) {
        return espacoComumRepository.save(espacoComum);
    }
}
