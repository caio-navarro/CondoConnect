import React, { useState } from 'react';

import MenuSidebar from '../../components/MenuSidebar/MenuSidebar.jsx';
import FormularioEspaco from './FormularioEspaco.jsx';
import ListaEspacos from './ListaEspacos.jsx';
import Modal from '../../components/Modal/Modal.jsx'; 

// --- Imports de Libs de UX ---
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './GerenciadorEspacos.css'; 


function GerenciadorEspacos() {
  
  
  const [espacos, setEspacos] = useState([
    { id: 1, nome: 'Piscina' },
    { id: 2, nome: 'Salão de Festas' },
    { id: 3, nome: 'Churrasqueira 01' },
  ]);

  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [espacoParaEditar, setEspacoParaEditar] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');

  // CREATE (Adicionar)
  const handleSalvarEspaco = (nomeDoNovoEspaco) => {
    if (!nomeDoNovoEspaco || nomeDoNovoEspaco.trim() === '') {
      toast.error('O nome do espaço não pode estar vazio.');
      return; 
    }
    const novoEspaco = {
      id: Date.now(), 
      nome: nomeDoNovoEspaco.trim(),
    };
    setEspacos([...espacos, novoEspaco]);
    toast.success('Espaço adicionado com sucesso!');
  };

  
  const handleExcluirEspaco = (idParaExcluir) => {
    const nomeDoEspaco = espacos.find(e => e.id === idParaExcluir)?.nome;

    Swal.fire({
      title: 'Você tem certeza?',
      html: `Deseja realmente excluir o espaço <b>${nomeDoEspaco}</b>?<br/>Esta ação não pode ser desfeita.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#E53E3E', 
      cancelButtonColor: '#999',
    }).then((result) => {
      if (result.isConfirmed) {
        const novaLista = espacos.filter((espaco) => espaco.id !== idParaExcluir);
        setEspacos(novaLista);
        toast.success('Espaço excluído com sucesso.');
      }
    });
  };

  

 
  const handleAbrirModalEdicao = (espaco) => {
    setEspacoParaEditar(espaco);
    setNomeEditado(espaco.nome); 
    setIsEditModalOpen(true);
  };

  const handleFecharModalEdicao = () => {
    setIsEditModalOpen(false);
    setEspacoParaEditar(null);
    setNomeEditado('');
  };

  const handleAtualizarEspaco = () => {
    if (!nomeEditado || nomeEditado.trim() === '') {
      toast.error('O nome não pode ficar vazio.');
      return;
    }

    
    const listaAtualizada = espacos.map((espaco) => {
      if (espaco.id === espacoParaEditar.id) {
        return { ...espaco, nome: nomeEditado.trim() }; 
      }
      return espaco; 
    });

    setEspacos(listaAtualizada);
    toast.success('Espaço atualizado!');
    handleFecharModalEdicao(); 
  };
  
  return (
    <> 
      <MenuSidebar />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="gerenciar-espacos-container">
        
        <h1>Gerenciar Espaços Comuns</h1>

        
        <div className="card-form-espaco">
          <h2>Cadastrar Novo Espaço</h2>
          <FormularioEspaco onSalvar={handleSalvarEspaco} />
        </div>

        
        <ListaEspacos 
          espacos={espacos} 
          onExcluir={handleExcluirEspaco} 
          onEditar={handleAbrirModalEdicao} 
        />
        
      </div>

      
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={handleFecharModalEdicao} 
        title="Editar Espaço"
      >
       
        <div className="modal-edicao-conteudo">
          <div className="form-grupo-modal">
            <label htmlFor="nome-editado">Nome do Espaço</label>
            <input
              type="text"
              id="nome-editado"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
            />
          </div>
          <div className="modal-botoes-footer">
            <button 
              className="btn btn-secundario" 
              onClick={handleFecharModalEdicao}
            >
              Cancelar
            </button>
            <button 
              className="btn btn-primario" 
              onClick={handleAtualizarEspaco}
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default GerenciadorEspacos;