package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Condominio;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CondominioRepository extends MongoRepository<Condominio, String> {
}
