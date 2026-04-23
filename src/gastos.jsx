import { useState } from 'react';
import './App.css';

function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState("");

  function agregarGasto() {
    if (nuevoGasto.trim() !== "") {
      setGastos([...gastos, nuevoGasto]);
      setNuevoGasto("");
    }
  }

  return (
    <div className="gastos">
      <h2>GASTOS</h2>

      <input
        type="text"
        value={nuevoGasto}
        onChange={(e) => setNuevoGasto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && agregarGasto()}
        placeholder="Ingrese un nuevo gasto"
      />

      <button onClick={agregarGasto}>Agregar Gasto</button>

      <ul>
        {gastos.map((gasto, index) => (
          <li key={index}>{gasto}</li>
        ))}
      </ul>
    </div>
  );
}

export default Gastos;