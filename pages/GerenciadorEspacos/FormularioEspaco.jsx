import React, { useState } from 'react';

function FormularioEspaco({ onSalvar }) {
 
  const [nome, setNome] = useState('');

  const handleSubmit = (evento) => {
    evento.preventDefault(); 

    
    onSalvar(nome);

    
    setNome('');
  };

  return (
    <form className="form-espaco" onSubmit={handleSubmit}>
      <div className="form-grupo">
        <label htmlFor="nome-espaco">Nome do espaço</label>
        <input
          type="text"
          id="nome-espaco"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Área Gourmet"
        />
      </div>
      <button type="submit">Salvar Espaço</button>
    </form>
  );
}

export default FormularioEspaco;