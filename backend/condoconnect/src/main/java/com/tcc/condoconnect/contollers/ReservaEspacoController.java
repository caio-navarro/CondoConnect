package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.ReservaEspacoApplication;
import com.tcc.condoconnect.dtos.ReservaEspacoRequest;
import com.tcc.condoconnect.models.ReservaEspaco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva-espaco")
public class ReservaEspacoController {

    @Autowired
    private ReservaEspacoApplication reservaApplication;

    @GetMapping
    public List<ReservaEspaco> listar(){
        return reservaApplication.listar();
    }

    @PostMapping
    public ReservaEspaco cadastrar(@RequestBody ReservaEspacoRequest reserva){
        return reservaApplication.cadastrar(reserva);
    }

    @PutMapping
    public ReservaEspaco atualizar(@RequestBody ReservaEspaco reserva){
        return reservaApplication.atualizar(reserva);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        reservaApplication.deletar(id);
    }
}
