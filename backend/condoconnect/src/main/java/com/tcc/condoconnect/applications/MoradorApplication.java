package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.models.MoradorModel;
import com.tcc.condoconnect.repositories.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MoradorApplication {

    @Autowired
    private MoradorRepository moradorRepository;

    public MoradorModel cadastrar(MoradorModel morador) {
        return moradorRepository.save(morador);
    }


}
