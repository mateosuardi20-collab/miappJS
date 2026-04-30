import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function Carga({ movimientos, setMovimientos }) {
    const [opcion, setOpcion] = useState('gasto');
    const [fecha, setFecha] = useState('');
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    const handleFechaChange = (date) => {
        const fechaFormato = date.toISOString().split('T')[0];
        setFecha(fechaFormato);
        setMostrarCalendario(false);
    };

    const agregarMovimiento = () => {
        if (!fecha || !descripcion || !monto) {
            alert('Por favor completa todos los campos');
            return;
        }

        if (editandoId) {
            setMovimientos(movimientos.map(mov => 
                mov.id === editandoId 
                    ? { ...mov, fecha, descripcion, monto: parseFloat(monto), tipo: opcion }
                    : mov
            ));
            setEditandoId(null);
        } else {
            const nuevoMovimiento = {
                id: Date.now(),
                fecha,
                descripcion,
                monto: parseFloat(monto),
                tipo: opcion
            };
            setMovimientos([...movimientos, nuevoMovimiento]);
        }

        setFecha('');
        setDescripcion('');
        setMonto('');
    };

    const borrarMovimiento = (id) => {
        setMovimientos(movimientos.filter(mov => mov.id !== id));
    };

    const editarMovimiento = (movimiento) => {
        setOpcion(movimiento.tipo);
        setFecha(movimiento.fecha);
        setDescripcion(movimiento.descripcion);
        setMonto(movimiento.monto.toString());
        setEditandoId(movimiento.id);
    };

    const movimientosOrdenados = [...movimientos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return (
        <div className="carga">
            <h2>Registrar Movimientos</h2>
            
            <select 
                className="selector-opcion"
                value={opcion}
                onChange={(e) => setOpcion(e.target.value)}
            >
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
            </select>

            <div className="formulario">
                <label>Fecha</label>
                <div className="contenedor-calendario">
                    <input 
                        type="text" 
                        className="input"
                        value={fecha ? new Date(fecha).toLocaleDateString('es-AR') : 'Selecciona una fecha'}
                        onClick={() => setMostrarCalendario(!mostrarCalendario)}
                        readOnly
                        placeholder="Selecciona una fecha"
                    />
                    {mostrarCalendario && (
                        <div className="calendario-popup">
                            <Calendar 
                                onChange={handleFechaChange}
                                value={fecha ? new Date(fecha) : new Date()}
                            />
                        </div>
                    )}
                </div>
                
                <label>Descripción</label>
                <input 
                    type="text" 
                    placeholder="Descripción del movimiento" 
                    className="input"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                
                <label>Monto</label>
                <input 
                    type="number" 
                    placeholder="Monto" 
                    className="input"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                />
                
                <button className="btn" onClick={agregarMovimiento}>
                    {editandoId ? 'Guardar Cambios' : 'Registrar'}
                </button>
                {editandoId && (
                    <button className="btn btn-cancelar" onClick={() => {
                        setEditandoId(null);
                        setFecha('');
                        setDescripcion('');
                        setMonto('');
                        setMostrarCalendario(false);
                    }}>
                        Cancelar
                    </button>
                )}
            </div>

            <div className="lista-movimientos">
                <h3>Movimientos Registrados</h3>
                {movimientosOrdenados.length === 0 ? (
                    <p>No hay movimientos registrados</p>
                ) : (
                    <ul>
                        {movimientosOrdenados.map(mov => (
                            <li key={mov.id} className={`movimiento ${mov.tipo}`}>
                                <div className="mov-info">
                                    <span className="mov-fecha">{new Date(mov.fecha).toLocaleDateString('es-AR')}</span>
                                    <span className="mov-desc">{mov.descripcion}</span>
                                    <span className={`mov-monto ${mov.tipo}`}>
                                        {mov.tipo === 'ingreso' ? '+' : '-'} ${mov.monto.toFixed(2)}
                                    </span>
                                </div>
                                <div className="mov-botones">
                                    <button className="btn-editar" onClick={() => editarMovimiento(mov)}>Editar</button>
                                    <button className="btn-eliminar" onClick={() => borrarMovimiento(mov.id)}>Borrar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Carga;
