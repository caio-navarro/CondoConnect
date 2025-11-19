package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Sindico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SindicoRepository extends JpaRepository<Sindico, Long> {
    Optional<Sindico> findByEmail(String email);

    boolean existsByCpf(String cpf);

    boolean existsByEmail(String email);

    Optional<Sindico> findByEmailAndSenha(String email, String senha);
}
