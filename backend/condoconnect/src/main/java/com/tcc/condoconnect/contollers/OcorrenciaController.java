package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.OcorrenciaApplication;
import com.tcc.condoconnect.models.Ocorrencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ocorrencia")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaApplication ocorrenciaApplication;

    @GetMapping("/listar")
    public List<Ocorrencia> listar(){
        return ocorrenciaApplication.listar();
    }

    @PostMapping("/cadastrar")
    public Ocorrencia cadastrar(@RequestBody Ocorrencia ocorrencia){
        return ocorrenciaApplication.cadastrar(ocorrencia);
    }

    @PutMapping("/atualizar")
    public Ocorrencia atualizar(@RequestBody Ocorrencia ocorrencia){
        return ocorrenciaApplication.atualizar(ocorrencia);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable String id){
        ocorrenciaApplication.deletar(id);
    }
}
