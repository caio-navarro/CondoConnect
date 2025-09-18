package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Morador;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MoradorRepository extends MongoRepository<Morador, String> {
}
