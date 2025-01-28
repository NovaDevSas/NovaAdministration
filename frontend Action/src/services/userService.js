import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/users/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};