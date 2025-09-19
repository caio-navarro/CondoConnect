package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.ReservaEspacoApplication;
import com.tcc.condoconnect.models.ReservaEspaco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva-espaco")
public class ReservaEspacoController {

    @Autowired
    private ReservaEspacoApplication reservaApplication;

    @GetMapping("/listar")
    public List<ReservaEspaco> listar(){
        return reservaApplication.listar();
    }

    @PostMapping("/cadastrar")
    public ReservaEspaco cadastrar(@RequestBody ReservaEspaco reserva){
        return reservaApplication.cadastrar(reserva);
    }

    @PutMapping("/atualizar")
    public ReservaEspaco atualizar(@RequestBody ReservaEspaco reserva){
        return reservaApplication.atualizar(reserva);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable String id){
        reservaApplication.deletar(id);
    }
}
