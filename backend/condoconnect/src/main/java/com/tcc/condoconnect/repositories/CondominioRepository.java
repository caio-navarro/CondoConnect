package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Condominio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CondominioRepository extends JpaRepository<Condominio, Long> {
}
