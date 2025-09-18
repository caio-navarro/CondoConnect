package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Sindico;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SindicoRepository extends MongoRepository<Sindico, String> {
}
