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

    public Condominio cadastrar(CondominioRequest request) {
        condominioValidator.validarCnpjDuplicado(request.cnpj());
        condominioValidator.validarEmailDuplicado(request.email());

        request.validar();

        Condominio condominio = new Condominio();
        condominio.setId(request.id());
        condominio.setNome(request.nome());
        condominio.setEndereco(request.endereco());
        condominio.setEmail(request.email());
        condominio.setCodigo(codigoGenerator.gerarCodigoCondominio());
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
