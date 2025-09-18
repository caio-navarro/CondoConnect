package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.MoradorApplication;
import com.tcc.condoconnect.models.Morador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/morador")
public class MoradorController {

    @Autowired
    private MoradorApplication moradorApplication;

    @GetMapping("/listar")
    public List<Morador> listar(){
        return moradorApplication.listar();
    }

    @PostMapping("/cadastrar")
    public Morador cadastrar(@RequestBody Morador morador){
        return moradorApplication.cadastrar(morador);
    }

    @PutMapping("/atualizar")
    public Morador atualizar(@RequestBody Morador morador){
        return moradorApplication.atualizar(morador);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable String id){
        moradorApplication.deletar(id);
    }
}
