package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.dtos.UsuarioRequest;
import com.tcc.condoconnect.entities.SindicoEntity;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import com.tcc.condoconnect.models.Sindico;
import com.tcc.condoconnect.repositories.CondominioRepository;
import com.tcc.condoconnect.repositories.SindicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SindicoApplication {

    @Autowired
    private SindicoRepository sindicoRepository;

    @Autowired
    private CondominioRepository condominioRepository;

    public List<Sindico> listar() {
        return sindicoRepository.findAll();
    }

    public Sindico cadastrar(UsuarioRequest request) {
        request.validar();

        Condominio condominio = condominioRepository.findByCodigo(request.codigoCondominio())
                .orElseThrow(() -> new RuntimeException("Código de condominio inválido!"));

        Sindico sindico = new Sindico();
        sindico.setCondominio(condominio);
        sindico.setNome(request.nome());
        sindico.setEmail(request.email());
        sindico.setTelefone(request.telefone());
        sindico.setCpf(request.cpf());
        sindico.setSenha(request.senha());

        return sindicoRepository.save(sindico);
    }

    public void deletar(Long id) {
        sindicoRepository.deleteById(id);
    }

    public Sindico atualizar(Sindico sindico) {
        return sindicoRepository.save(sindico);
    }
}
