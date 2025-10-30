package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.SindicoApplication;
import com.tcc.condoconnect.dtos.UsuarioRequest;
import com.tcc.condoconnect.models.Sindico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sindico")
public class SindicoController {

    @Autowired
    private SindicoApplication sindicoApplication;

    @GetMapping
    public List<Sindico> listar(){
        return sindicoApplication.listar();
    }

    @PostMapping
    public Sindico cadastrar(@RequestBody UsuarioRequest sindico){
        return sindicoApplication.cadastrar(sindico);
    }

    @PutMapping
    public Sindico atualizar(@RequestBody Sindico sindico){
        return sindicoApplication.atualizar(sindico);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        sindicoApplication.deletar(id);
    }
}
