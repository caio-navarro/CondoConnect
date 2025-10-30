package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.CondominioApplication;
import com.tcc.condoconnect.dtos.CondominioRequest;
import com.tcc.condoconnect.facade.CondominioFacade;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/condominio")
public class CondominioController {

    @Autowired
    private CondominioFacade condominioFacade;

    @GetMapping
    public List<Condominio> listar(){
        return condominioFacade.listar();
    }

    @PostMapping
    public Condominio cadastrar(@RequestBody CondominioRequest condominio){
        return condominioFacade.cadastrar(condominio);
    }

    @PutMapping
    public Condominio atualizar(@RequestBody Condominio condominio){
        return condominioFacade.atualizar(condominio);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        condominioFacade.deletar(id);
    }
}
