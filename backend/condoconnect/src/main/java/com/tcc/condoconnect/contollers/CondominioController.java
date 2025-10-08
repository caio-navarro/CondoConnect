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

    @GetMapping("/listar")
    public List<Condominio> listar(){
        return condominioApplication.listar();
    }

    @PostMapping("/cadastrar")
    public Condominio cadastrar(@RequestBody Condominio condominio){
        return condominioApplication.cadastrar(condominio);
    }

    @PutMapping("/atualizar")
    public Condominio atualizar(@RequestBody Condominio condominio){
        return condominioApplication.atualizar(condominio);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable Long id){
        condominioApplication.deletar(id);
    }
}
