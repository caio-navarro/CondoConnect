package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.EspacoComumApplication;
import com.tcc.condoconnect.models.EspacoComum;
import com.tcc.condoconnect.models.Ocorrencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/espaco-comum")
public class EspacoComumController {

    @Autowired
    private EspacoComumApplication espacoApplication;

    @GetMapping("/listar")
    public List<EspacoComum> listar(){
        return espacoApplication.listar();
    }

    @PostMapping("/cadastrar")
    public EspacoComum cadastrar(@RequestBody EspacoComum espacoComum){
        return espacoApplication.cadastrar(espacoComum);
    }

    @PutMapping("/atualizar")
    public EspacoComum atualizar(@RequestBody EspacoComum espacoComum){
        return espacoApplication.atualizar(espacoComum);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable String id){
        espacoApplication.deletar(id);
    }
}
