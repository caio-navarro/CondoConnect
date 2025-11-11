import React from 'react';

function MinhasReservas({ reservas }) {
  
  // Função para dar uma classe de CSS diferente baseado no status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'aprovado':
        return 'status-aprovado';
      case 'pendente':
        return 'status-pendente';
      case 'recusado':
        return 'status-recusado';
      default:
        return '';
    }
  };

  return (
    <div className="card-reservas">
      <h2>Minhas Reservas</h2>
      
      {reservas.length === 0 ? (
        <p>Você ainda não fez nenhuma reserva.</p>
      ) : (
        <ul className="lista-itens-reserva">
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <span>
                <strong>{reserva.nomeEspaco}</strong> - {reserva.data}
              </span>
              
              <span className={`status-tag ${getStatusClass(reserva.status)}`}>
                {reserva.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MinhasReservas;