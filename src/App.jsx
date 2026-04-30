import { useState, useRef } from 'react'
import './App.css'
import Carga from './carga'
import Balance from './balance'

function App() {
  const contactoRef = useRef(null)
  const balanceRef = useRef(null)
  const [movimientos, setMovimientos] = useState([])

  const scrollToContacto = () => {
    contactoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTobalance = () => {
    balanceRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const calcularTotales = () => {
    let ingresos = 0
    let gastos = 0

    movimientos.forEach(mov => {
      if (mov.tipo === 'ingreso') {
        ingresos += mov.monto
      } else {
        gastos += mov.monto
      }
    })

    return {
      ingresos: ingresos.toFixed(2),
      gastos: gastos.toFixed(2),
      balance: (ingresos - gastos).toFixed(2)
    }
  }

  const { ingresos, gastos, balance } = calcularTotales()
  const balanceEsPositivo = Number(balance) >= 0
  
  return (
    <>
      <nav className="menu">
        <ul className="container">
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              onClick={scrollTobalance}
            >
              Balance
            </button>
          </li>
          <li>
            <button
              onClick={scrollToContacto}
            >
              Contacto
            </button>
          </li>
        </ul>
      </nav>

      <main className="paneles">
        <div className="container seccion-principal">
          <h1>BIENVENIDO A TU GESTOR DE GASTOS</h1>
          <Carga movimientos={movimientos} setMovimientos={setMovimientos} />
        </div>
        <div ref={balanceRef} className="container mt-4 seccion-card panel-card p-4">
          <Balance
            ingresos={ingresos}
            gastos={gastos}
            balance={balance}
            balanceEsPositivo={balanceEsPositivo}
          />
        </div>
        <div ref={contactoRef} className="container mt-4 seccion-card panel-card p-4">
          <h1 className="titulo-contacto">Contacto</h1>
          <p>Si tenés alguna pregunta, no dudes en contactarme.</p>
          <p>Email: mateosuardi20@gmail.com</p>
          <p>Teléfono: +54 9 3562 512754</p>
        </div>
      </main>

      <footer>
        <p className="text-center py-3 mb-0">
          &copy;2026 MR. Todos los derechos reservados.
        </p>
      </footer>
    </>
  )
}

export default App
