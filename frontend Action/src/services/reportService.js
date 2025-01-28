import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/reports';

export const getReportData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
    throw error;
  }
};

export const getScheduledReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/scheduled-reports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching scheduled reports:', error);
    throw error;
  }
};

export const createScheduledReport = async (reportConfig) => {
  try {
    const response = await axios.post(`${API_URL}/scheduled-reports`, reportConfig);
    return response.data;
  } catch (error) {
    console.error('Error creating scheduled report:', error);
    throw error;
  }
};