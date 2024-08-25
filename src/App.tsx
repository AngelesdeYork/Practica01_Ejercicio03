// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DiceGameForm from './login';
import DosDados from './dosDados'; // Asegúrate de que la ruta sea correcta


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<DiceGameForm />} />
            <Route path="/dosDados" element={<DosDados />} />
        </Routes>
    );
};

export default App;

