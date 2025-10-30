package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.MoradorApplication;
import com.tcc.condoconnect.dtos.UsuarioRequest;
import com.tcc.condoconnect.facade.MoradorFacade;
import com.tcc.condoconnect.models.Morador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/morador")
public class MoradorController {

    @Autowired
    private MoradorFacade moradorFacade;

    @GetMapping
    public List<Morador> listar(){
        return moradorFacade.listar();
    }

    @PostMapping
    public Morador cadastrar(@RequestBody UsuarioRequest morador){
        return moradorFacade.cadastrar(morador);
    }

    @PutMapping
    public Morador atualizar(@RequestBody Morador morador){
        return moradorFacade.atualizar(morador);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        moradorFacade.deletar(id);
    }
}
