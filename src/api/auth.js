import axios from 'axios';

const API_BASE_URL = 'https://def-e-library-server.onrender.com/api/auth';

export const signUp = (data) => axios.post(`${API_BASE_URL}/register`, data);
export const verifyOtp = (data) => axios.post(`${API_BASE_URL}/verify-otp`, data);
export const signIn = (data) => axios.post(`${API_BASE_URL}/login`, data);
