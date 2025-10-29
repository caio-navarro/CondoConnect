package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.entities.MoradorEntity;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.repositories.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MoradorApplication {

    @Autowired
    private MoradorRepository moradorRepository;

    public List<Morador> listar() {
        return moradorRepository.findAll();
    }

    public Morador cadastrar(Morador morador) {
        MoradorEntity moradorEntity = MoradorEntity.toMorador(morador);
        moradorEntity.validar();

        return moradorRepository.save(morador);
    }

    public void deletar(Long id) {
        moradorRepository.deleteById(id);
    }

    public Morador atualizar(Morador morador) {
        return moradorRepository.save(morador);
    }

}
