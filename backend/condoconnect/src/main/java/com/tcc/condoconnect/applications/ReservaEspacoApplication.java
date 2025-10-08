package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.ReservaEspaco;
import com.tcc.condoconnect.repositories.ReservaEspacoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReservaEspacoApplication {

    @Autowired
    private ReservaEspacoRepository reservaEspacoRepository;

    public List<ReservaEspaco> listar() {
        return reservaEspacoRepository.findAll();
    }

    public ReservaEspaco cadastrar(ReservaEspaco reservaEspaco) {
        return reservaEspacoRepository.save(reservaEspaco);
    }

    public void deletar(Long id) {
        reservaEspacoRepository.deleteById(id);
    }

    public ReservaEspaco atualizar(ReservaEspaco reservaEspaco) {
        return reservaEspacoRepository.save(reservaEspaco);
    }
}
