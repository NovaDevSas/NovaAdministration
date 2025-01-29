import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

const logout = async () => {
  // Implementación del logout
  // Por ejemplo, eliminar el token de autenticación del almacenamiento local
  localStorage.removeItem('token');
};

const authService = {
  login,
  register,
  logout,

};

export default authService;