import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-logo">A-Note</span>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Início
          </NavLink>
        </li>
        <li>
          <NavLink to="/cadastro" className={({ isActive }) => isActive ? 'active' : ''}>
            Cadastro
          </NavLink>
        </li>
        <li>
          <NavLink to="/listagem" className={({ isActive }) => isActive ? 'active' : ''}>
            Listagem
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
