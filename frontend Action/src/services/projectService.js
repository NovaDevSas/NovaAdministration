import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/projects';

const getProjects = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getProjectsByCompany = async (companyId) => {
  const response = await axios.get(`${API_URL}/company/${companyId}`);
  return response.data;
};

const getProjectById = async (projectId) => {
  const response = await axios.get(`${API_URL}/${projectId}`);
  return response.data;
};

const createProject = async (projectData) => {
  const response = await axios.post(API_URL, projectData);
  return response.data;
};

const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_URL}/${id}`, projectData);
  return response.data;
};

const deleteProject = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export {
  getProjects,
  getProjectsByCompany,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};