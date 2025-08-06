import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../../pages/Auth/AuthForm'; // your reusable form
import './LoginPage.css';


const API_BASE = 'https://def-e-library-server.onrender.com/api/auth';

const LoginPage = () => {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    emailOrUsername: '', // for sign in
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]); // <-- added dependency array here

  const handleChange = (e) => {
    setError('');
    setInfo('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    const { username, email, phoneNumber, password } = formData;
    if (!username || !email || !phoneNumber || !password) {
      setError('All fields are required for sign up');
      return;
    }

    try {
      await axios.post(`${API_BASE}/register`, {
        username,
        email,
        phoneNumber,
        password,
      });
      setInfo('Registered successfully! You can now sign in.');
      setMode('signin');
      setFormData({ username: '', email: '', phoneNumber: '', password: '', emailOrUsername: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    const { emailOrUsername, password } = formData;
    if (!emailOrUsername || !password) {
      setError('Email or username and password are required');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/login`, {
        emailOrUsername,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        {/* If your image is in public folder */}
        <img src="/deff.jpeg" alt="Logo" className="logo" />
        {/* Or, if you imported: */}
        {/* <img src={logo} alt="Logo" className="logo" /> */}

        <div className="login-container">
          {mode === 'signup' && (
            <>
              {info && <p className="info-text">{info}</p>}
              {error && <p className="error-text">{error}</p>}
              <AuthForm
                isSignUp={true}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSignUp}
                error={error}
              />
              <p style={{ textAlign: 'center', marginTop: 16 }}>
                Already have an account?{' '}
                <button
                  className="toggle-form-button"
                  onClick={() => {
                    setMode('signin');
                    setError('');
                    setInfo('');
                    setFormData({ username: '', email: '', phoneNumber: '', password: '', emailOrUsername: '' });
                  }}
                >
                  Sign In
                </button>
              </p>
            </>
          )}

          {mode === 'signin' && (
            <>
              {info && <p className="info-text">{info}</p>}
              {error && <p className="error-text">{error}</p>}
              <AuthForm
                isSignUp={false}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSignIn}
                error={error}
              />
              <p style={{ textAlign: 'center', marginTop: 16 }}>
                Don't have an account?{' '}
                <button
                  className="toggle-form-button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setInfo('');
                    setFormData({ username: '', email: '', phoneNumber: '', password: '', emailOrUsername: '' });
                  }}
                >
                  Sign Up
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
