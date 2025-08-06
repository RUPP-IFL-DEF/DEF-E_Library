import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const signUpStudent = (data) => API.post('/student/signup', data);
export const signInStudent = (data) => API.post('/student/signin', data);
