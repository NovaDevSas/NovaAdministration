import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getProjectsByCompany } from '../../services/projectService';
import { getCompanies } from '../../services/companyService';
import CompanyDropdown from './CompanyDropdown';
import ProjectDropdown from './ProjectDropdown';
import CircularChart from './CircularChart';

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB'],
      },
    ],
  });
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
        if (companiesData.length > 0) {
          setSelectedCompanyId(companiesData[0]._id); // Selecciona la primera compañía por defecto
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!selectedCompanyId) return;

      try {
        const projectsData = await getProjectsByCompany(selectedCompanyId);
        setProjects(projectsData);
        if (projectsData.length > 0) {
          setSelectedProjectId(projectsData[0]._id); // Selecciona el primer proyecto por defecto
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [selectedCompanyId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedProjectId) return;

      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/finance-items/summary/${selectedProjectId}`);
        const { amount, costs, income } = response.data;

        setChartData({
          labels: ['Ingresos', 'Gastos', 'Monto'],
          datasets: [
            {
              data: [income, costs, amount],
              backgroundColor: ['#4CAF50', '#FF6384', '#36A2EB'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProjectId]);

  const handleCompanyChange = (event) => {
    setSelectedCompanyId(event.target.value);
  };

  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Rentabilidad Proyecto</h1>
      <CompanyDropdown
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        handleCompanyChange={handleCompanyChange}
      />
      <ProjectDropdown
        projects={projects}
        selectedProjectId={selectedProjectId}
        handleProjectChange={handleProjectChange}
      />
      <CircularChart chartData={chartData} loading={loading} />
    </div>
  );
};

export default PieChart;