package com.tcc.condoconnect.applications.validators;

import com.tcc.condoconnect.repositories.CondominioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CondominioValidator {

    @Autowired
    private CondominioRepository condominioRepository;

    public void validarCnpjDuplicado(String cnpj){

        if(condominioRepository.existsByCnpj(cnpj)) {
            throw new RuntimeException("CNPJ já cadastrado!");
        }
    }

    public void validarEmailDuplicado(String email){
        if(condominioRepository.existsByEmail(email)) {
            throw new RuntimeException("Email já cadastrado!");
        }
    }
}
