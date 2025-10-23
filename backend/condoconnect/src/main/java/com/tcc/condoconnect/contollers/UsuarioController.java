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

    @GetMapping
    public List<Usuario> listar(){
        return usuarioApplication.listar();
    }

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario){
        return usuarioApplication.cadastrar(usuario);
    }

    @PutMapping
    public Usuario atualizar(@RequestBody Usuario usuario){
        return usuarioApplication.atualizar(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        usuarioApplication.deletar(id);
    }
}
