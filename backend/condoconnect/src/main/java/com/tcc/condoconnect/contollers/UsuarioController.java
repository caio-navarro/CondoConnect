package com.tcc.condoconnect.contollers;

import com.tcc.condoconnect.applications.UsuarioApplication;
import com.tcc.condoconnect.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioApplication usuarioApplication;

    @GetMapping("/listar")
    public List<Usuario> listar(){
        return usuarioApplication.listar();
    }

    @PostMapping("/cadastrar")
    public Usuario cadastrar(@RequestBody Usuario usuario){
        return usuarioApplication.cadastrar(usuario);
    }

    @PutMapping("/atualizar")
    public Usuario atualizar(@RequestBody Usuario usuario){
        return usuarioApplication.atualizar(usuario);
    }

    @DeleteMapping("/deletar/{id}")
    public void deletar(@PathVariable Long id){
        usuarioApplication.deletar(id);
    }
}
