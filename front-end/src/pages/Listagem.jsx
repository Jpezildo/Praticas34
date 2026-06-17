import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'
import '../styles/listagem.css'

export default function Listagem() {
  const { notes, deleteNote } = useNotes()
  const [apiNotes, setApiNotes] = useState([])
  const [loadingApi, setLoadingApi] = useState(true)
  const [errorApi, setErrorApi] = useState(null)
  const [search, setSearch] = useState('')

  // Busca notas de exemplo da API JSONPlaceholder
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then(res => {
        if (!res.ok) throw new Error('Falha ao buscar dados da API.')
        return res.json()
      })
      .then(data => {
        setApiNotes(data)
        setLoadingApi(false)
      })
      .catch(err => {
        setErrorApi(err.message)
        setLoadingApi(false)
      })
  }, [])

  const filteredLocal = notes.filter(n =>
    n.titulo.toLowerCase().includes(search.toLowerCase()) ||
    n.texto.toLowerCase().includes(search.toLowerCase())
  )

  const filteredApi = apiNotes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.body.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="listagem">
      <div className="listagem-header">
        <h2 className="page-title">Minhas Notas</h2>
        <Link to="/cadastro" className="btn btn-primary">+ Nova Nota</Link>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Buscar notas…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* ── Notas cadastradas pelo usuário ── */}
      <section className="notes-section">
        <h3 className="section-title">Notas Criadas</h3>

        {filteredLocal.length === 0 ? (
          <p className="empty-msg">
            {notes.length === 0
              ? 'Nenhuma nota criada ainda. '
              : 'Nenhuma nota encontrada para a busca.'}
            {notes.length === 0 && (
              <Link to="/cadastro" className="link">Criar primeira nota →</Link>
            )}
          </p>
        ) : (
          <div className="notes-grid">
            {filteredLocal.map(note => (
              <article key={note.id} className="note-card local">
                <div className="note-card-header">
                  <span className="note-badge">{note.categoria}</span>
                  <span className="note-date">{note.criadaEm}</span>
                </div>
                <h4>{note.titulo}</h4>
                <p>{note.texto}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNote(note.id)}
                >
                  Excluir
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Notas de exemplo da API ── */}
      <section className="notes-section">
        <h3 className="section-title">
          Notas de Exemplo
          <span className="api-badge">JSONPlaceholder API</span>
        </h3>

        {loadingApi && <p className="loading-msg">Carregando da API…</p>}
        {errorApi && <p className="error-msg-api">⚠ {errorApi}</p>}

        {!loadingApi && !errorApi && (
          <div className="notes-grid">
            {filteredApi.length === 0
              ? <p className="empty-msg">Nenhum resultado para a busca.</p>
              : filteredApi.map(note => (
                <article key={note.id} className="note-card api">
                  <div className="note-card-header">
                    <span className="note-badge api-tag">API</span>
                    <span className="note-date">#{note.id}</span>
                  </div>
                  <h4>{note.title}</h4>
                  <p>{note.body}</p>
                </article>
              ))
            }
          </div>
        )}
      </section>
    </div>
  )
}
