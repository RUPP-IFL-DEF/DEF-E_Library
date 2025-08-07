import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Login/Contact/Contact';
import ProfilePage from './pages/ProfilePage';
import Record from './pages/Race/Record';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
      <Route path="/record" element={isLoggedIn ? <Record /> : <Navigate to="/login" />} />
      <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
      <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
