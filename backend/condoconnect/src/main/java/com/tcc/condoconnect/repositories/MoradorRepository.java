package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Morador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long> {
}
