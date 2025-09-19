package com.tcc.condoconnect.repositories;

import com.tcc.condoconnect.models.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
}
