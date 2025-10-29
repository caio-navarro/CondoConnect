package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.AuthApplication;
import com.tcc.condoconnect.dtos.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthApplication authApplication;

    @PostMapping("/morador")
    public ResponseEntity<?> loginMorador(@RequestBody LoginRequest loginRequest) {
        return authApplication.loginMorador(loginRequest);
    }

    @PostMapping("/condominio")
    public ResponseEntity<?> loginCondominio(@RequestBody LoginRequest loginRequest) {
        return authApplication.loginCondominio(loginRequest);
    }

    @PostMapping("/sindico")
    public ResponseEntity<?> loginSindico(@RequestBody LoginRequest loginRequest) {
        return authApplication.loginSindico(loginRequest);
    }
}
