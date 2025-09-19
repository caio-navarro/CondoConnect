package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.EspacoComum;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EspacoComumRepository extends MongoRepository<EspacoComum, String> {
}
