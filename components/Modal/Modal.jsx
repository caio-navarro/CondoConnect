import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  // Se não estiver aberto (isOpen=false), não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    // O Fundo (Overlay)
    // Clicar no fundo chama a função onClose
    <div className="modal-overlay" onClick={onClose}>
      
      {/* O Card do Modal */}
      {/* Usamos e.stopPropagation() para impedir que um clique
          aqui "vaze" para o overlay e feche o modal acidentalmente */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabeçalho com Título e Botão de Fechar (X) */}
        <div className="modal-header">
          <h2 className="modal-title">{title || 'Confirmação'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times; {/* Isso é um 'X' */}
          </button>
        </div>

        {/* Corpo do Modal (onde o conteúdo da outra página entra) */}
        <div className="modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;