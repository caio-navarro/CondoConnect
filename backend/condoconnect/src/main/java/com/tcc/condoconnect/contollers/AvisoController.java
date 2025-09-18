package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.AvisoApplication;
import com.tcc.condoconnect.applications.UsuarioApplication;
import com.tcc.condoconnect.models.Aviso;
import com.tcc.condoconnect.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aviso")
public class AvisoController {

    @Autowired
    private AvisoApplication avisoApplication;

    @GetMapping("/listar")
    public List<Aviso> listar(){
        return avisoApplication.listar();
    }

    @PostMapping("/cadastrar")
    public Aviso cadastrar(@RequestBody Aviso aviso){
        return avisoApplication.cadastrar(aviso);
    }

    @PutMapping("/atualizar")
    public Aviso atualizar(@RequestBody Aviso aviso){
        return avisoApplication.atualizar(aviso);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable String id){
        avisoApplication.deletar(id);
    }
}
