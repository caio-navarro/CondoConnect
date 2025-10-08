package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Sindico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SindicoRepository extends JpaRepository<Sindico, Long> {
}
