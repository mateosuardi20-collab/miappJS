import { useState } from 'react'
import './App.css'
import Gastos from './gastos'
import Carga from './carga'

function App() {
  const [activeItem, setActiveItem] = useState('inicio')

  return (
    <>
      <nav className="menu">
        <ul className="container mt-3">
          <li>
            <button
              onClick={() => setActiveItem('inicio')}
              className={activeItem === 'inicio' ? 'active' : ''}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveItem('acerca de')}
              className={activeItem === 'acerca de' ? 'active' : ''}
            >
              Acerca de
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveItem('contacto')}
              className={activeItem === 'contacto' ? 'active' : ''}
            >
              Contacto
            </button>
          </li>
        </ul>
      </nav>

      <main className="paneles">
        <div className="panel">
          <Gastos />
        </div>
        <div className="panel">
          <Carga />
        </div>
      </main>
      <footer>
        <p className="text-center py-3 mb-0">©2026 Gestor de Gastos. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App
