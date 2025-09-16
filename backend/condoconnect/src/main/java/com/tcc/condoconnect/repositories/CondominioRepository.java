package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.CondominioModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CondominioRepository extends MongoRepository<CondominioModel, String> {
}
