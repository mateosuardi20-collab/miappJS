import { useRef, useState } from 'react';
import './App.css';

function Carga({ movimientos, setMovimientos }) {
    const [opcion, setOpcion] = useState('gasto');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const fechaInputRef = useRef(null);

    const abrirCalendario = () => {
        fechaInputRef.current?.showPicker?.();
    };

    const limpiarFormulario = () => {
        setFecha('');
        setDescripcion('');
        setMonto('');
        setEditandoId(null);
    };

    const agregarMovimiento = (e) => {
        e.preventDefault();

        if (!fecha || !descripcion || !monto) {
            alert('Por favor completa todos los campos');
            return;
        }

        const movimientoGuardado = {
            fecha,
            descripcion,
            monto: parseFloat(monto),
            tipo: opcion,
        };

        if (editandoId) {
            setMovimientos(
                movimientos.map((mov) =>
                    mov.id === editandoId ? { ...mov, ...movimientoGuardado } : mov
                )
            );
        } else {
            setMovimientos([
                ...movimientos,
                { id: Date.now(), ...movimientoGuardado },
            ]);
        }

        limpiarFormulario();
    };

    const borrarMovimiento = (id) => {
        setMovimientos(movimientos.filter((mov) => mov.id !== id));
    };

    const editarMovimiento = (movimiento) => {
        setOpcion(movimiento.tipo);
        setFecha(movimiento.fecha);
        setDescripcion(movimiento.descripcion);
        setMonto(movimiento.monto.toString());
        setEditandoId(movimiento.id);
    };

    const movimientosOrdenados = [...movimientos].sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    const mostrarFecha = (fechaTexto) => {
        return new Date(`${fechaTexto}T00:00:00`).toLocaleDateString('es-AR');
    };

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

            <form className="formulario" onSubmit={agregarMovimiento}>
                <label>Fecha</label>
                <input
                    ref={fechaInputRef}
                    type="date"
                    className="input"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    onClick={abrirCalendario}
                    onFocus={abrirCalendario}
                />

                <label>Descripcion</label>
                <input
                    type="text"
                    placeholder="Descripcion del movimiento"
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

                <button type="submit" className="btn">
                    {editandoId ? 'Guardar Cambios' : 'Registrar'}
                </button>

                {editandoId && (
                    <button
                        type="button"
                        className="btn btn-cancelar"
                        onClick={limpiarFormulario}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <div className="lista-movimientos">
                <h3>Movimientos Registrados</h3>

                {movimientosOrdenados.length === 0 ? (
                    <p>No hay movimientos registrados</p>
                ) : (
                    <ul>
                        {movimientosOrdenados.map((mov) => (
                            <li key={mov.id} className={`movimiento ${mov.tipo}`}>
                                <div className="mov-info">
                                    <span className="mov-fecha">
                                        {mostrarFecha(mov.fecha)}
                                    </span>
                                    <span className="mov-desc">{mov.descripcion}</span>
                                    <span className={`mov-monto ${mov.tipo}`}>
                                        {mov.tipo === 'ingreso' ? '+' : '-'} ${mov.monto.toFixed(2)}
                                    </span>
                                </div>

                                <div className="mov-botones">
                                    <button className="btn-editar" onClick={() => editarMovimiento(mov)}>
                                        Editar
                                    </button>
                                    <button className="btn-eliminar" onClick={() => borrarMovimiento(mov.id)}>
                                        Borrar
                                    </button>
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
