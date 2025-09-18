package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Ocorrencia;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OcorrenciaRepository extends MongoRepository<Ocorrencia, String> {
}
