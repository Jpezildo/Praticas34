import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css'; 

import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Dashboard from './pages/Dashboard/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial joga para o Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Definição das três rotas principais */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}