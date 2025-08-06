import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';  // Login page (public)
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Login/Contact/Contact';
import ProfilePage from './pages/ProfilePage';

function App() {
  // Get the JWT token from localStorage and check if it's valid
  const token = localStorage.getItem('token');

  // Check if the token is valid (not null or empty)
  const isLoggedIn = token && token !== "";

  return (
    <Routes>
      {/* Public Route for Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      {/* If token exists and is valid, render the protected page; otherwise, redirect to /login */}
      <Route 
        path="/" 
        element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/about" 
        element={isLoggedIn ? <About /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/contact" 
        element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} 
      />
      
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    
  );
}

export default App;
