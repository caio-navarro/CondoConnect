package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.SindicoApplication;
import com.tcc.condoconnect.models.Sindico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sindico")
public class SindicoController {

    @Autowired
    private SindicoApplication sindicoApplication;

    @GetMapping("/listar")
    public List<Sindico> listar(){
        return sindicoApplication.listar();
    }

    @PostMapping("/cadastrar")
    public Sindico cadastrar(@RequestBody Sindico sindico){
        return sindicoApplication.cadastrar(sindico);
    }

    @PutMapping("/atualizar")
    public Sindico atualizar(@RequestBody Sindico sindico){
        return sindicoApplication.atualizar(sindico);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable Long id){
        sindicoApplication.deletar(id);
    }
}
