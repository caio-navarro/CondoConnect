package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.OcorrenciaApplication;
import com.tcc.condoconnect.dtos.OcorrenciaRequest;
import com.tcc.condoconnect.models.Ocorrencia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/ocorrencia")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaApplication ocorrenciaApplication;

    @GetMapping
    public List<Ocorrencia> listar(){
        return ocorrenciaApplication.listar();
    }

    @PostMapping
    public Ocorrencia cadastrar(@RequestBody OcorrenciaRequest ocorrencia){
        return ocorrenciaApplication.cadastrar(ocorrencia);
    }

    @PutMapping
    public Ocorrencia atualizar(@RequestBody Ocorrencia ocorrencia){
        return ocorrenciaApplication.atualizar(ocorrencia);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        ocorrenciaApplication.deletar(id);
    }
}
