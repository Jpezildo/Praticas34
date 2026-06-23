import React, { useState } from 'react';
import './NoteCard.css';

export default function NoteCard({ id, titulo, conteudo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitulo, setEditTitulo] = useState(titulo);
  const [editConteudo, setEditConteudo] = useState(conteudo);

  const handleSalvarEdicao = () => {
    onEdit(id, editTitulo, editConteudo);
    setIsEditing(false);
  };

  const handleCancelarEdicao = () => {
    setEditTitulo(titulo);
    setEditConteudo(conteudo);
    setIsEditing(false);
  };

  return (
    <article className="cartao-nota">
      {isEditing ? (
        <>
          <header className="cartao-nota-topo">
            <input 
              type="text" 
              className="input-edicao-titulo"
              value={editTitulo}
              onChange={(e) => setEditTitulo(e.target.value)}
            />
          </header>
          <div className="cartao-nota-corpo">
            <textarea 
              className="textarea-edicao-conteudo"
              value={editConteudo}
              onChange={(e) => setEditConteudo(e.target.value)}
            />
          </div>
          <footer className="cartao-nota-rodape rodape-edicao">
            <button onClick={handleSalvarEdicao} className="botao-salvar-edicao">Salvar</button>
            <button onClick={handleCancelarEdicao} className="botao-cancelar-edicao">Cancelar</button>
          </footer>
        </>
      ) : (
        <>
          <header className="cartao-nota-topo">
            <h3>{titulo}</h3>
          </header>
          <div className="cartao-nota-corpo">
            <p>{conteudo}</p>
          </div>
          <footer className="cartao-nota-rodape">
            <span role="img" aria-label="Editar" onClick={() => setIsEditing(true)}>✏️</span>
            <span role="img" aria-label="Lixeira" onClick={() => onDelete(id)}>🗑️</span>
          </footer>
        </>
      )}
    </article>
  );
}