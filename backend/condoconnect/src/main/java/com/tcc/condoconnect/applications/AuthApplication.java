package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.dtos.LoginRequest;
import com.tcc.condoconnect.dtos.LoginResponse;
import com.tcc.condoconnect.enums.StatusUsuario;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Sindico;
import com.tcc.condoconnect.repositories.CondominioRepository;
import com.tcc.condoconnect.repositories.MoradorRepository;
import com.tcc.condoconnect.repositories.SindicoRepository;
import java.util.Map;
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

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        String email = loginRequest.email();
        String senha = loginRequest.senha();

        // Morador
        var morador = moradorRepository.findByEmailAndSenha(email, senha);
        if (morador.isPresent()) {
            var m = morador.get();
            return ResponseEntity.ok(new LoginResponse(m.getId(), m.getNome(), m.getRole(), m.getStatusUsuario()));
        }

        // Síndico
        var sindico = sindicoRepository.findByEmailAndSenha(email, senha);
        if (sindico.isPresent()) {
            var s = sindico.get();
            return ResponseEntity.ok(new LoginResponse(s.getId(), s.getNome(), s.getRole(), s.getStatusUsuario()));
        }

        // Condomínio
        var condominio = condominioRepository.findByEmailAndSenha(email, senha);
        if (condominio.isPresent()) {
            var c = condominio.get();
            return ResponseEntity.ok(new LoginResponse(c.getId(), c.getNome(), c.getRole(), c.getStatusUsuario()));
        }

        return ResponseEntity.status(401).body(Map.of("erro", "Email ou senha inválidos"));
    }
}