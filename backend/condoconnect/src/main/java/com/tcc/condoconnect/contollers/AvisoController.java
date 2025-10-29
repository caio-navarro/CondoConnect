package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.AvisoApplication;
import com.tcc.condoconnect.models.Aviso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aviso")
public class AvisoController {

    @Autowired
    private AvisoApplication avisoApplication;

    @GetMapping
    public List<Aviso> listar(){
        return avisoApplication.listar();
    }

    @PostMapping
    public Aviso cadastrar(@RequestBody Aviso aviso){
        return avisoApplication.cadastrar(aviso);
    }

    @PutMapping
    public Aviso atualizar(@RequestBody Aviso aviso){
        return avisoApplication.atualizar(aviso);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        avisoApplication.deletar(id);
    }
}
