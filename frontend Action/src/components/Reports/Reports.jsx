import React, { useState, useEffect } from 'react';
import { getReportData } from '../../services/reportService';
import ReportsFilters from './ReportsFilters';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import SummaryTable from './SummaryTable';
import ReportsExport from './ReportsExport';

const Reports = () => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({
    companies: [],
    projects: [],
    financeItems: [],
    tasks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportData = await getReportData();
        setData(reportData);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Aquí iría la lógica para actualizar los datos según los filtros
  };

  const filteredData = {
    ...data,
    projects: data.projects.filter(project => {
      const matchesDateRange = !filters.dateRange || (new Date(project.startDate) <= new Date(filters.dateRange) && new Date(project.endDate) >= new Date(filters.dateRange));
      const matchesCompany = !filters.company || data.companies.find(company => company._id === project.companyId)?.name.includes(filters.company);
      const matchesProject = !filters.project || project.name.includes(filters.project);
      return matchesDateRange && matchesCompany && matchesProject;
    }),
    financeItems: data.financeItems.filter(item => {
      const matchesMetric = !filters.metric || item.type === filters.metric;
      return matchesMetric;
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reports</h1>
      <ReportsFilters onFilterChange={handleFilterChange} />
      <BarChart data={filteredData} />
      <PieChart data={filteredData} />
      <LineChart data={filteredData} />
      <SummaryTable data={filteredData} />
      <ReportsExport data={filteredData} />
    </div>
  );
};

export default Reports;