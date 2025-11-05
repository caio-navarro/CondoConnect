package com.tcc.condoconnect.applications;

import com.tcc.condoconnect.applications.validators.CondominioValidator;
import com.tcc.condoconnect.utils.CodigoCondominioGenerator;
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

    @Autowired
    private CodigoCondominioGenerator codigoGenerator;

    @Autowired
    private CondominioValidator condominioValidator;

    public List<Condominio> listar() {
        return condominioRepository.findAll();
    }

    public Condominio cadastrar(CondominioRequest condominioRequest) {
        condominioValidator.validarCnpjDuplicado(condominioRequest.cnpj());
        condominioValidator.validarEmailDuplicado(condominioRequest.email());

        condominioRequest.validar();

        Condominio condominio = new Condominio();
        condominio.setId(condominioRequest.id());
        condominio.setNome(condominioRequest.nome());
        condominio.setEndereco(condominioRequest.endereco());
        condominio.setEmail(condominioRequest.email());
        condominio.setCodigo(codigoGenerator.gerarCodigoCondominio());
        condominio.setTelefone(condominioRequest.telefone());
        condominio.setCnpj(condominioRequest.cnpj());
        condominio.setSenha(condominioRequest.senha());

        return condominioRepository.save(condominio);
    }

    public void deletar(Long id) {
        condominioRepository.deleteById(id);
    }

    public Condominio atualizar(Condominio condominio) {
        return condominioRepository.save(condominio);
    }

}
