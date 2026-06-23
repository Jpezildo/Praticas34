import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header-global">
      <div className="header-logo">
        <span className="icone-livro">📖</span>
        <h1>A-Note</h1>
      </div>
      <div className="header-perfil">
        <span className="icone-usuario">👤</span>
      </div>
    </header>
  );
}