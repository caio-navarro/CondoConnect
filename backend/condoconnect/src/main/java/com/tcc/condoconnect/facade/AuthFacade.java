package com.tcc.condoconnect.facade;

import com.tcc.condoconnect.applications.AuthApplication;
import com.tcc.condoconnect.dtos.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class AuthFacade {

    @Autowired
    private AuthApplication authApplication;

    public ResponseEntity<?> loginMorador(LoginRequest loginRequest){
        return authApplication.loginMorador(loginRequest);
    }

    public ResponseEntity<?> loginCondominio(LoginRequest loginRequest) {
        return authApplication.loginCondominio(loginRequest);
    }

    public ResponseEntity<?> loginSindico(LoginRequest loginRequest){
        return authApplication.loginSindico(loginRequest);
    }
}
