import React from 'react';

function ListaEspacos({ espacos, onReservar }) {
  return (
    <div className="card-reservas">
      
      <h2>2. Selecione o Espaço</h2>
      <ul className="lista-itens-reserva">
        {espacos.map((espaco) => (
          <li key={espaco.id}>
            <span>{espaco.nome}</span>
            <button 
              className="btn-reservar"
              onClick={() => onReservar(espaco)}
            >
              Reservar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaEspacos;