package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.applications.validators.UsuarioValidator;
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

    @Autowired
    private UsuarioValidator usuarioValidator;

    public List<Morador> listar() {
        return moradorRepository.findAll();
    }

    public Morador cadastrar(UsuarioRequest moradorRequest) {
        usuarioValidator.validarCpfDuplicado(moradorRequest.cpf());
        usuarioValidator.validarEmailDuplicado(moradorRequest.email());

        moradorRequest.validar();

        Condominio condominio = condominioRepository.findByCodigo(moradorRequest.codigoCondominio())
                .orElseThrow(() -> new RuntimeException("Código de condominio inválido!"));

        Morador morador = new Morador();
        morador.setId(moradorRequest.id());
        morador.setCondominio(condominio);
        morador.setNome(moradorRequest.nome());
        morador.setEmail(moradorRequest.email());
        morador.setTelefone(moradorRequest.telefone());
        morador.setCpf(moradorRequest.cpf());
        morador.setSenha(moradorRequest.senha());

        return moradorRepository.save(morador);
    }

    public void deletar(Long id) {
        moradorRepository.deleteById(id);
    }

    public Morador atualizar(Morador morador) {
        return moradorRepository.save(morador);
    }

}
