package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.ReservaEspaco;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservaEspacoRepository extends MongoRepository<ReservaEspaco, String> {
}
