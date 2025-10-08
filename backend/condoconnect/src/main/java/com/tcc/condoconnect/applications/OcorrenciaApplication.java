package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.Ocorrencia;
import com.tcc.condoconnect.repositories.OcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OcorrenciaApplication {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    public List<Ocorrencia> listar() {
        return ocorrenciaRepository.findAll();
    }

    public Ocorrencia cadastrar(Ocorrencia ocorrencia) {
        return ocorrenciaRepository.save(ocorrencia);
    }

    public void deletar(Long id) {
        ocorrenciaRepository.deleteById(id);
    }

    public Ocorrencia atualizar(Ocorrencia ocorrencia) {
        return ocorrenciaRepository.save(ocorrencia);
    }
}
