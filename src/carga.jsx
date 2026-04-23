import { useState } from 'react';
import './App.css';

function Carga() {
    const [ingreso, setIngreso] = useState("");
    const [ingresos, setIngresos] = useState([]);

    function agregarIngreso() {
        if (ingreso.trim() !== "") {
            setIngresos([...ingresos, ingreso]);
            setIngreso("");
        }
    }

    return (
        <div className="carga">
            <h2>INGRESOS</h2>
            <input
                type="text"
                value={ingreso}
                onChange={(e) => setIngreso(e.target.value)}
                placeholder="Ingrese un nuevo ingreso"
            />
            <button onClick={agregarIngreso}>Agregar Ingreso</button>
            <ul>
                {ingresos.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default Carga;
