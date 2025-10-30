package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.dtos.CondominioRequest;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.repositories.CondominioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CondominioApplication {

    @Autowired
    private CondominioRepository condominioRepository;

    public List<Condominio> listar() {
        return condominioRepository.findAll();
    }

    public Condominio cadastrar(CondominioRequest request) {
        request.validar();

        Condominio condominio = new Condominio();
        condominio.setId(request.id());
        condominio.setNome(request.nome());
        condominio.setEmail(request.email());
        condominio.setTelefone(request.telefone());
        condominio.setCnpj(request.cnpj());
        condominio.setSenha(request.senha());

        return condominioRepository.save(condominio);
    }

    public void deletar(Long id) {
        condominioRepository.deleteById(id);
    }

    public Condominio atualizar(Condominio condominio) {
        return condominioRepository.save(condominio);
    }

}
