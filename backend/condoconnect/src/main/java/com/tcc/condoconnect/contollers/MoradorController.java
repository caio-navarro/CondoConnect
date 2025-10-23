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

    @GetMapping
    public List<Morador> listar(){
        return moradorApplication.listar();
    }

    @PostMapping
    public Morador cadastrar(@RequestBody Morador morador){
        return moradorApplication.cadastrar(morador);
    }

    @PutMapping
    public Morador atualizar(@RequestBody Morador morador){
        return moradorApplication.atualizar(morador);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        moradorApplication.deletar(id);
    }
}
