package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Aviso;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AvisoRepository extends MongoRepository<Aviso, String> {
}
