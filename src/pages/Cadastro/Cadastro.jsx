import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    
    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    navigate('/login');
  };

  const voltarParaLogin = () => {
    navigate('/login');
  };

  return (
    <main className="container-cadastro">
      <section className="cartao-cadastro">
        <h2 className="titulo-cadastro">Cadastro</h2>
        
        <form className="corpo-cartao-cadastro" onSubmit={handleCadastro}>
          <label className="campo-input-cadastro">
            <input 
              type="text" 
              placeholder="Nome" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          
          <label className="campo-input-cadastro">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          
          <label className="campo-input-cadastro">
            <input 
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>

          <label className="campo-input-cadastro">
            <input 
              type="password" 
              placeholder="Confirmar senha" 
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </label>
          
          <button type="submit" className="botao-cadastrar">
            Criar Conta
          </button>

          <p className="texto-voltar" onClick={voltarParaLogin}>
            Já tenho uma conta. Fazer login.
          </p>
        </form>
      </section>
    </main>
  );
}