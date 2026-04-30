import './App.css';

function Balance({ ingresos, gastos, balance, balanceEsPositivo }) {
    return (
        <>
            <h2 className="titulo-balance">Balance Actual</h2>
            <p>
                <span className="texto-ingreso">Ingresos:</span>{' '}
                <span className="monto-ingreso">${ingresos}</span>
            </p>
            <p>
                <span className="texto-gasto">Gastos:</span>{' '}
                <span className="monto-gasto">${gastos}</span>
            </p>
            <h3 className={`resultado-balance ${balanceEsPositivo ? 'balance-positivo' : 'balance-negativo'}`}>
                Balance: ${balance}
            </h3>
        </>
    );
}

export default Balance;
