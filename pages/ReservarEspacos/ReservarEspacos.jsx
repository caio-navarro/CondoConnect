import React, { useState } from 'react';
import MenuSidebar from '../../components/MenuSidebar/MenuSidebar.jsx';
import ListaEspacos from './ListaEspacos.jsx';
import MinhasReservas from './MinhasReservas.jsx';
import './ReservarEspaco.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------

function ReservarEspaco() {
  const espacosDisponiveis = [
    { id: 1, nome: 'Piscina' },
    { id: 2, nome: 'Salão de Festas' },
    { id: 3, nome: 'Churrasqueira 01' },
    { id: 4, nome: 'Academia' },
  ];
  const [minhasReservas, setMinhasReservas] = useState([
    { id: 101, nomeEspaco: 'Piscina', data: '15/12/2025', status: 'Aprovado' },
    { id: 102, nomeEspaco: 'Salão de Festas', data: '22/12/2025', status: 'Pendente' },
  ]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());


const handleReservar = (espaco) => {
    const novaReserva = {
      id: Date.now(),
      nomeEspaco: espaco.nome,
      data: dataSelecionada.toLocaleDateString('pt-BR'), 
      status: 'Pendente',
    };

    setMinhasReservas([...minhasReservas, novaReserva]);
    toast.success('Pedido de reserva enviado! Aguarde a aprovação.');
  };

  return (
    <> 
      <MenuSidebar />

      
      <ToastContainer 
        position="top-right" 
        autoClose={3000}     
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />

      <div className="reservar-espaco-container">
        <h1>Reservar Espaços Comuns</h1>

        <div className="layout-reservas">
          <div className="coluna-esquerda">
            <div className="card-reservas card-datepicker">
              <h2>1. Selecione a Data</h2>
              <DatePicker 
                selected={dataSelecionada} 
                onChange={(date) => setDataSelecionada(date)}
                minDate={new Date()}
                inline
              />
            </div>
            <MinhasReservas 
              reservas={minhasReservas} 
            />
          </div>
          <div className="coluna-direita">
            <ListaEspacos 
              espacos={espacosDisponiveis} 
              onReservar={handleReservar} 
            />
          </div>
        </div>

      </div>
    </>
  );
}

export default ReservarEspaco;