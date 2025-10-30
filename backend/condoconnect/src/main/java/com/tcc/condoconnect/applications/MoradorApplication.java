package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.dtos.UsuarioRequest;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.repositories.CondominioRepository;
import com.tcc.condoconnect.repositories.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MoradorApplication {

    @Autowired
    private MoradorRepository moradorRepository;

    @Autowired
    private CondominioRepository condominioRepository;

    public List<Morador> listar() {
        return moradorRepository.findAll();
    }

    public Morador cadastrar(UsuarioRequest request) {
        request.validar();

        Condominio condominio = condominioRepository.findByCodigo(request.codigoCondominio())
                .orElseThrow(() -> new RuntimeException("Código de condominio inválido!"));

        Morador morador = new Morador();
        morador.setId(request.id());
        morador.setCondominio(condominio);
        morador.setNome(request.nome());
        morador.setEmail(request.email());
        morador.setTelefone(request.telefone());
        morador.setCpf(request.cpf());
        morador.setSenha(request.senha());

        return moradorRepository.save(morador);
    }

    public void deletar(Long id) {
        moradorRepository.deleteById(id);
    }

    public Morador atualizar(Morador morador) {
        return moradorRepository.save(morador);
    }

}
