import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuSidebar.css';
import { Menu, X, User, LogOut } from 'lucide-react'; // Ícones minimalistas e bonitos

function MenuSidebar({ nomeUsuario = 'Emanuel', tipoUsuario = 'Síndico' }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuLinks = [
    { name: 'Dashboard', path: '/sindico/dashboard' },
    { name: 'Aprovar Reservas', path: '/sindico/reservas/aprovar' },
    { name: 'Cadastrar Espaços', path: '/sindico/espacos' },
    { name: 'Criar Aviso (Mural)', path: '/sindico/mural/criar' },
    { name: 'Aprovar Moradores/Síndicos', path: '/admin/moradores/aprovar' },
  ];

  return (
    <>
      {/* Botão flutuante de menu */}
      <button className="menu-toggle-btn" onClick={toggleMenu} aria-label="Abrir menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">CONDO<span>CONNECT</span></h2>
        </div>

        {/* Seção do Usuário */}
        <div className="sidebar-user">
          <div className="user-icon">
            <User size={40} />
          </div>
          <div className="user-info">
            <span className="user-name">{nomeUsuario}</span>
            <span className="user-role">{tipoUsuario}</span>
          </div>
        </div>

        {/* Navegação */}
        <nav className="sidebar-nav">
          <ul>
            {menuLinks.map((link) => (
              <li key={link.path} onClick={toggleMenu}>
                <Link to={link.path} className="sidebar-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Rodapé */}
        <footer className="sidebar-footer">
          <Link to="/" className="sidebar-btn-sair" onClick={toggleMenu}>
            <LogOut size={18} />
            <span>Sair</span>
          </Link>
        </footer>
      </aside>

      {/* Overlay escuro quando o menu abre */}
      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default MenuSidebar;
