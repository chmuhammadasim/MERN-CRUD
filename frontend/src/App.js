import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Items from './pages/items';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const setTokenAndStore = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setTokenAndStore} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={token ? <Items token={token} /> : <Navigate to="/login" />} />
        <Route path="/" element={token ? <Navigate to="/items" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
