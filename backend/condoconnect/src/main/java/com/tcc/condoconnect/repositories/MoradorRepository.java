package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.MoradorModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MoradorRepository extends MongoRepository<MoradorModel, String> {
}
