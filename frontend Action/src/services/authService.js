import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/auth';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const resetPassword = async (userData) => {
  const response = await axios.post(`${API_URL}/reset-password`, userData);
  return response.data;
};

export default {
  register,
  login,
  resetPassword,
};