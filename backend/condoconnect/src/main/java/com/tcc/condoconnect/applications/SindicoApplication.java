package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.Sindico;
import com.tcc.condoconnect.repositories.SindicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SindicoApplication {

    @Autowired
    private SindicoRepository sindicoRepository;

    public List<Sindico> listar() {
        return sindicoRepository.findAll();
    }

    public Sindico cadastrar(Sindico sindico) {
        return sindicoRepository.save(sindico);
    }

    public void deletar(Long id) {
        sindicoRepository.deleteById(id);
    }

    public Sindico atualizar(Sindico sindico) {
        return sindicoRepository.save(sindico);
    }
}
