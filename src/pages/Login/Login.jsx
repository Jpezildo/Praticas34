import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const navigate = useNavigate(); // 2. Inicialize o hook

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Preencha todos os campos para fazer login.');
      return;
    }
    
  
    navigate('/dashboard'); 
  };

  const irParaCadastro = () => {
  
    navigate('/cadastro');
  };

  return (
    <main className="container-login">
      <section className="cartao-login">
        <header className="topo-cartao">
          <h2>Login</h2>
        </header>
        
        <form className="corpo-cartao" onSubmit={handleLogin}>
          <label className="campo-input">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="campo-input">
            <input 
              type="password" 
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          
          <p className="texto-cadastro">Não tem cadastro?</p>
          
          <button type="button" className="botao-acao" onClick={irParaCadastro}>
            Criar Conta
          </button>

          <button type="submit" className="botao-acao" style={{ marginTop: '10px', backgroundColor: '#b3b3b3' }}>
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}