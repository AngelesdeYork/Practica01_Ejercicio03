import React, { useState } from 'react';

const DiceGameForm = () => {
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [montoInicial, setMontoInicial] = useState('');
    const [cantidadDados, setCantidadDados] = useState('2');

    // Método que se llamará para iniciar el juego con la cantidad de dados seleccionada
    const dadosGame = (cantidad: string) => {
        console.log(`Juego comenzado con ${cantidad} dados.`);
        // Aquí puedes agregar la lógica específica del juego con dados.
    };

    const handleGameStart = () => {
        const today = new Date();
        const birthDate = new Date(fechaNacimiento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            // Ajustar la edad
            age--; // Aquí ajustamos la edad correctamente
        }

        // Lógica para el caso cuando el usuario tiene al menos 21 años
        if (age >= 21) {
            // Guardar datos en localStorage
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('monto_inicial', montoInicial);

            // Llamar al método dadosGame antes de la redirección
            dadosGame(cantidadDados);

            // Redirigir a la página correspondiente según la cantidad de dados
            if (cantidadDados === '2') {
                window.location.href = '/dosDados'; // Navegar a dosDados
            } else if (cantidadDados === '3') {
                window.location.href = '/tresDados'; // Navegar a tresDados
            }
        } else {
            alert('Lo sentimos, debes tener al menos 21 años para jugar.');
            setTimeout(() => {
                window.location.href = '/login'; // Redirigir a login después de 5 segundos
            }, 5000);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-5">
                    <div className="d-flex justify-content-center">
                        <h3>Bienvenido al Juego de Apuestas con Dados</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <div className="card">
                        <div className="card-header bg-black d-flex justify-content-center align-items-center">
                            <h3>Ingresar Datos</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group mt-2">
                                <label htmlFor="nombre">Nombre: </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento: </label>
                                <input
                                    type="date"
                                    name="fecha_nacimiento"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="montoInicial">Monto Inicial: </label>
                                <input
                                    type="number"
                                    name="monto_inicial"
                                    value={montoInicial}
                                    onChange={(e) => setMontoInicial(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cantidadDados">Cantidad de Dados (2 o 3): </label>
                                <select
                                    name="cantidad_dados"
                                    value={cantidadDados}
                                    onChange={(e) => setCantidadDados(e.target.value)}
                                    required
                                >
                                    <option value="2">2 Dados</option>
                                    <option value="3">3 Dados</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-pers" onClick={handleGameStart}>
                                    Comenzar Juego
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiceGameForm;
