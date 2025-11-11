import React from 'react';
//IMPORTANDO ÍCONES
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; 



function ListaEspacos({ espacos, onExcluir, onEditar }) {
  return (
    <div className="card-lista-espacos">
      <h2>Espaços Já Cadastrados</h2>
      
      {espacos.length === 0 ? (
        <p>Nenhum espaço cadastrado ainda.</p>
      ) : (
        <ul className="lista-itens-espacos">
          {espacos.map((espaco) => (
            <li key={espaco.id}>
              
              <span>{espaco.nome}</span>
              
              <div className="grupo-acoes-icones">
                <button 
                  className="btn-icone btn-editar"
                  onClick={() => onEditar(espaco)} 
                >
                  <FaPencilAlt />
                </button>
                <button 
                  className="btn-icone btn-excluir"
                  onClick={() => onExcluir(espaco.id)}
                >
                  <FaTrash />
                </button>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaEspacos;