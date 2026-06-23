import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import NoteCard from '../../components/NoteCard/NoteCard';
import './Dashboard.css';

export default function Dashboard() {
  const [estaExpandido, setEstaExpandido] = useState(false);
  
  const [tituloNovaNota, setTituloNovaNota] = useState('');
  const [conteudoNovaNota, setConteudoNovaNota] = useState('');

  const [notas, setNotas] = useState([
    { id: 1, titulo: 'Nome', conteudo: 'Bom dia flor do dia! Está um belo dia lá fora!' },
    { id: 2, titulo: 'Lista de compras', conteudo: '- Comprar: Banana, manga, melancia, maçã.' },
    { id: 3, titulo: 'Senhas', conteudo: 'joaosilva@gmail.com: 012345' },
    { id: 4, titulo: 'Anotações palestra', conteudo: '- Evitar usar o celular na hora de acordar, isso pode atrapalhar...' }
  ]);

  const salvarNovaNota = () => {
    if (!conteudoNovaNota) return; 

    const novaNotaObj = {
      id: Date.now(),
      titulo: tituloNovaNota || 'Sem título',
      conteudo: conteudoNovaNota
    };

    setNotas([novaNotaObj, ...notas]); 
    
    setTituloNovaNota('');
    setConteudoNovaNota('');
    setEstaExpandido(false);
  };

  const deletarNota = (idParaDeletar) => {
    const notasFiltradas = notas.filter((nota) => nota.id !== idParaDeletar);
    setNotas(notasFiltradas);
  };

  const editarNota = (idParaEditar, novoTitulo, novoConteudo) => {
    const notasAtualizadas = notas.map((nota) => {
      if (nota.id === idParaEditar) {
        return { ...nota, titulo: novoTitulo, conteudo: novoConteudo };
      }
      return nota;
    });
    setNotas(notasAtualizadas);
  };

  return (
    <div className="layout-dashboard">
      <Header />
      
      <main className="conteudo-principal">
        <div className="barra-pesquisa">
          <span className="icone-lupa">🔍</span>
          <input type="text" placeholder="Pesquisar" />
        </div>

        <div className="area-adicionar-nota">
          {!estaExpandido ? (
            <input 
              type="text" 
              placeholder="Adicionar nota..." 
              className="input-simples"
              onFocus={() => setEstaExpandido(true)} 
            />
          ) : (
            <div className="formulario-nota-expandido">
              <input 
                type="text" 
                placeholder="Insira o título" 
                className="input-titulo-expandido"
                value={tituloNovaNota}
                onChange={(e) => setTituloNovaNota(e.target.value)}
              />
              <textarea 
                placeholder="Criar nota..." 
                className="textarea-conteudo-expandido"
                rows="4"
                value={conteudoNovaNota}
                onChange={(e) => setConteudoNovaNota(e.target.value)}
              />
              <footer className="rodape-formulario-expandido">
                <div className="botoes-formulario">
                  <button className="botao-salvar-nota" onClick={salvarNovaNota}>Salvar</button>
                  <button className="botao-fechar-nota" onClick={() => setEstaExpandido(false)}>Cancelar</button>
                </div>
              </footer>
            </div>
          )}
        </div>

        <section className="grid-notas">
          {notas.map((nota) => (
            <NoteCard 
              key={nota.id} 
              id={nota.id}
              titulo={nota.titulo} 
              conteudo={nota.conteudo} 
              onDelete={deletarNota}
              onEdit={editarNota}
            />
          ))}
        </section>
      </main>
    </div>
  );
}