package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.dtos.LoginRequest;
import com.tcc.condoconnect.dtos.LoginResponse;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Sindico;
import com.tcc.condoconnect.repositories.CondominioRepository;
import com.tcc.condoconnect.repositories.MoradorRepository;
import com.tcc.condoconnect.repositories.SindicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class AuthApplication {

    @Autowired
    private MoradorRepository moradorRepository;

    @Autowired
    private CondominioRepository condominioRepository;

    @Autowired
    private SindicoRepository sindicoRepository;

    public ResponseEntity<?> loginMorador(LoginRequest loginRequest) {
        Morador morador = moradorRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha incorretos!"));

        if (!morador.getSenha().equals(loginRequest.senha())) {
            throw new IllegalArgumentException("Email ou senha incorretos!");
        }

        LoginResponse response = new LoginResponse(
                morador.getId(),
                morador.getNome(),
                morador.getEmail()
        );

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> loginCondominio(LoginRequest loginRequest) {
        Condominio condominio = condominioRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha incorretos!"));

        if (!condominio.getSenha().equals(loginRequest.senha())) {
            throw new IllegalArgumentException("Email ou senha incorretos!");
        }

        LoginResponse response = new LoginResponse(
                condominio.getId(),
                condominio.getNome(),
                condominio.getEmail()
        );

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> loginSindico(LoginRequest loginRequest) {
        Sindico sindico = sindicoRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new IllegalArgumentException("Email ou senha incorretos!"));

        if (!sindico.getSenha().equals(loginRequest.senha())) {
            throw new IllegalArgumentException("Email ou senha incorretos!");
        }

        LoginResponse response = new LoginResponse(
                sindico.getId(),
                sindico.getNome(),
                sindico.getEmail()
        );

        return ResponseEntity.ok(response);
    }



}
