import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/finance-items';

export const getFinanceItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching finance items:', error);
    throw error;
  }
};

export const getFinanceItemsByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching finance items by project:', error);
    throw error;
  }
};

export const createFinanceItem = async (financeItem) => {
  try {
    const response = await axios.post(API_URL, financeItem);
    return response.data;
  } catch (error) {
    console.error('Error creating finance item:', error);
    throw error;
  }
};

export const updateFinanceItem = async (id, financeItem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, financeItem);
    return response.data;
  } catch (error) {
    console.error('Error updating finance item:', error);
    throw error;
  }
};

export const deleteFinanceItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting finance item:', error);
    throw error;
  }
};