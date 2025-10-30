package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.EspacoComumApplication;
import com.tcc.condoconnect.dtos.EspacoComumRequest;
import com.tcc.condoconnect.models.EspacoComum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/espaco-comum")
public class EspacoComumController {

    @Autowired
    private EspacoComumApplication espacoApplication;

    @GetMapping
    public List<EspacoComum> listar(){
        return espacoApplication.listar();
    }

    @PostMapping
    public EspacoComum cadastrar(@RequestBody EspacoComumRequest espacoComumRequest){
        return espacoApplication.cadastrar(espacoComumRequest);
    }

    @PutMapping
    public EspacoComum atualizar(@RequestBody EspacoComum espacoComum){
        return espacoApplication.atualizar(espacoComum);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        espacoApplication.deletar(id);
    }
}
