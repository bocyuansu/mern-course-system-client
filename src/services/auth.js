import axios from 'axios';

const API_URL = 'https://breakable-duck-kilt.cyclic.app/api/user';

const userRequest = axios.create({
  baseURL: API_URL,
});

export const login = (data) => userRequest.post('/login', data);
export const logout = () => localStorage.removeItem('user');
export const register = (data) => userRequest.post('/register', data);
export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));
