import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'
import '../styles/cadastro.css'

const INITIAL_FORM = { titulo: '', texto: '', categoria: '' }
const CATEGORIAS = ['Pessoal', 'Trabalho', 'Estudo', 'Ideia', 'Outro']

export default function Cadastro() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const { addNote } = useNotes()
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpa o erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!form.titulo.trim()) newErrors.titulo = 'O título é obrigatório.'
    else if (form.titulo.trim().length < 3) newErrors.titulo = 'O título deve ter ao menos 3 caracteres.'
    if (!form.texto.trim()) newErrors.texto = 'O conteúdo é obrigatório.'
    else if (form.texto.trim().length < 10) newErrors.texto = 'O conteúdo deve ter ao menos 10 caracteres.'
    if (!form.categoria) newErrors.categoria = 'Selecione uma categoria.'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    addNote({
      titulo: form.titulo.trim(),
      texto: form.texto.trim(),
      categoria: form.categoria,
      criadaEm: new Date().toLocaleDateString('pt-BR'),
    })
    setSuccess(true)
    setForm(INITIAL_FORM)
    setErrors({})
    setTimeout(() => {
      setSuccess(false)
      navigate('/listagem')
    }, 1500)
  }

  return (
    <div className="cadastro">
      <h2 className="page-title">Nova Nota</h2>

      {success && (
        <div className="alert alert-success">
          ✓ Nota criada com sucesso! Redirecionando…
        </div>
      )}

      <form className="cadastro-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Ex: Lista de compras"
            className={errors.titulo ? 'input-error' : ''}
          />
          {errors.titulo && <span className="error-msg">{errors.titulo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className={errors.categoria ? 'input-error' : ''}
          >
            <option value="">Selecione…</option>
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoria && <span className="error-msg">{errors.categoria}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="texto">Conteúdo</label>
          <textarea
            id="texto"
            name="texto"
            value={form.texto}
            onChange={handleChange}
            placeholder="Escreva sua nota aqui…"
            rows={6}
            className={errors.texto ? 'input-error' : ''}
          />
          {errors.texto && <span className="error-msg">{errors.texto}</span>}
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          Salvar Nota
        </button>
      </form>
    </div>
  )
}
