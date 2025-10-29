package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.CondominioApplication;
import com.tcc.condoconnect.models.Condominio;
import com.tcc.condoconnect.models.Morador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/condominio")
public class CondominioController {

    @Autowired
    private CondominioApplication condominioApplication;

    @GetMapping
    public List<Condominio> listar(){
        return condominioApplication.listar();
    }

    @PostMapping
    public Condominio cadastrar(@RequestBody Condominio condominio){
        return condominioApplication.cadastrar(condominio);
    }

    @PutMapping
    public Condominio atualizar(@RequestBody Condominio condominio){
        return condominioApplication.atualizar(condominio);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        condominioApplication.deletar(id);
    }
}
