package com.tcc.condoconnect.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "endereco_morador")
public class EnderecoMorador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rua;     // rua interna do condomínio
    private String numero;  // número da casa
}
