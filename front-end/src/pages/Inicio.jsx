import { Link } from 'react-router-dom'
import '../styles/inicio.css'

export default function Inicio() {
  return (
    <div className="inicio">
      <div className="inicio-content">
        <h1>Bem-vindo ao <span>A-Note</span></h1>
        <p>Organize suas ideias de forma simples e rápida. Crie, visualize e gerencie suas notas em um só lugar.</p>
        <div className="inicio-actions">
          <Link to="/cadastro" className="btn btn-primary">Criar Nota</Link>
          <Link to="/listagem" className="btn btn-secondary">Ver Notas</Link>
        </div>
      </div>
      <div className="inicio-illustration">
        <div className="note-card-preview">
          <div className="note-line"></div>
          <div className="note-line short"></div>
          <div className="note-line"></div>
          <div className="note-line medium"></div>
        </div>
      </div>
    </div>
  )
}
