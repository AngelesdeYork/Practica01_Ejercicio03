import React, { useState, useEffect } from 'react';

const DadosGame = () => {
  // Initialize state variables
  const [nombre, setNombre] = useState<string | null>(localStorage.getItem('nombre'));
  const [montoInicial, setMontoInicial] = useState<number>(parseFloat(localStorage.getItem('monto_inicial') || '0'));
  const [nuevoMontoDisponible, setNuevoMontoDisponible] = useState<number>(montoInicial);
  const [montoApostado, setMontoApostado] = useState<number>(0);
  const [numeroDado1, setNumeroDado1] = useState<number | null>(null);
  const [numeroDado2, setNumeroDado2] = useState<number | null>(null);
  const [numeroSuma, setNumeroSuma] = useState<number | null>(null);
  const [numeroSeleccionado, setNumeroSeleccionado] = useState<number | null>(null);
  const [ganador, setGanador] = useState<boolean>(false);

  useEffect(() => {
    // Update available amount when initial amount changes
    setNuevoMontoDisponible(montoInicial);
  }, [montoInicial]);

  // Handle bet submission
  const handleBetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (montoApostado <= 0) {
      alert("El monto apostado debe ser mayor que cero.");
    } else if (montoApostado > nuevoMontoDisponible) {
      alert("El monto apostado no puede ser mayor que el monto disponible.");
    } else {
      // Reduce the available amount by the bet amount
      setNuevoMontoDisponible(nuevoMontoDisponible - montoApostado);
      setMontoApostado(0); // Clear the bet amount after submission
    }
  };

  // Dice rolling logic
  const lanzarDados = () => {
    const dado1 = Math.floor(Math.random() * 6) + 1;
    const dado2 = Math.floor(Math.random() * 6) + 1;
    const suma = dado1 + dado2;

    setNumeroDado1(dado1);
    setNumeroDado2(dado2);
    setNumeroSuma(suma);

    // Determine if the player has won
    if (numeroSeleccionado === suma) {
      setGanador(true);
    } else {
      setGanador(false);
    }
  };

  // Handle selection of number
  const handleNumberSelect = (number: number) => {
    setNumeroSeleccionado(number);
  };

  return (
    <div className="container-fluid">
      <div className="row bg-color">
        <div className="col-12 p-4">
          <div className="d-flex justify-content-center">
            <h3>Bienvenido al Juego de Apuestas con Dados</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-2 bg-player p-3 w-100 d-flex justify-content-start">
          <h4>Jugador: </h4>
        </div>
        <div className="col-4 d-flex justify-content-start bg-data align-items-center">
          <h4>{nombre}</h4>
        </div>
        <div className="col-3 bg-player p-3 w-100 d-flex justify-content-start">
          <h4>Monto Disponible: </h4>
        </div>
        <div className="col-3 d-flex justify-content-start bg-data align-items-center">
          <h4>{`¢${nuevoMontoDisponible.toFixed(2)}`}</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-6 w-100 d-flex justify-content-start bg-nothing"></div>
        <div className="col-3 bg-player p-3 w-100 d-flex justify-content-start">
          <h4>Monto Apostado: </h4>
        </div>
        <div className="col-3 d-flex justify-content-start bg-data align-items-center">
          <h4>{`¢${montoApostado.toFixed(2)}`}</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mt-4">
          <form onSubmit={handleBetSubmit}>
            <input
              type="number"
              value={montoApostado}
              onChange={(e) => setMontoApostado(parseFloat(e.target.value))}
              placeholder="Ingrese monto de apuesta"
              max={nuevoMontoDisponible}
              required
            />
            <button type="submit" className="btn btn-game">Apostar</button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4 m-0 p-0">
          <div className="d-flex justify-content-center bg-title">
            <h3>Dados</h3>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <img className="imgSize" id="dado1" src={`/src/img/${numeroDado1 || 'fondoBlnco'}.jpg`} alt="Dado 1" />
            <img className="imgSize" id="dado2" src={`/src/img/${numeroDado2 || 'fondoBlnco'}.jpg`} alt="Dado 2" />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-game mt-5" onClick={lanzarDados}>
              <h2>[ JUGAR ]</h2>
            </button>
          </div>
        </div>
        <div className="col-4 m-0 p-0">
          <div className="d-flex justify-content-center bg-title">
            <h3>Tablero de Apuestas</h3>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-5">
            <table border={2} width="350px" style={{ height: "150px" }}>
              <tbody>
                {Array.from({ length: 3 }, (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 4 }, (_, colIndex) => {
                      const number = rowIndex * 4 + colIndex + 1;
                      return (
                        <td
                          key={number}
                          style={{
                            width: "87px",
                            backgroundColor: number === 1 ? "black" : (numeroSeleccionado === number ? "lightblue" : "white"),
                            color: number === 1 ? "white" : "black",
                            cursor: "pointer"
                          }}
                          onClick={() => handleNumberSelect(number)}
                        >
                          {number}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div id="resultadosDados">
              Numero Aleatorio: <span>{numeroDado1}</span><br />
              Numero Aleatorio: <span>{numeroDado2}</span>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <div id="sumaDados">La suma de los dados es: <span>{numeroSuma}</span></div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            {ganador && <div className="text-success">¡Felicidades! Has ganado.</div>}
            {!ganador && numeroSuma !== null && <div className="text-danger">Lo siento, has perdido.</div>}
          </div>
        </div>
        <div className="col-4 m-0 p-0">
          <div className="d-flex justify-content-center bg-title">
            <h3>Estatus</h3>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <img className="imgSizeEmo" id="imagenResultado" src={`/src/img/fondoBlnco.jpg`} alt="emoji 1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosGame;




