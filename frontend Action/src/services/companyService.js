import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/companies';

export const getCompanyById = async (companyId) => {
  const response = await axios.get(`${API_URL}/${companyId}`);
  return response.data;
};

export const getCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCompany = async (company) => {
  const response = await axios.post(API_URL, company);
  return response.data;
};

export const updateCompany = async (id, company) => {
  const response = await axios.put(`${API_URL}/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};