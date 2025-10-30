package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Condominio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CondominioRepository extends JpaRepository<Condominio, Long> {

    Optional<Condominio> findByCodigo(String codigo);
    Optional<Condominio> findByEmail(String email);

    boolean existsByCnpj(String cnpj);
    boolean existsByEmail(String email);

}
