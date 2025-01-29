import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import MosaicPage from './components/Mosaic/MosaicPage';
import Dashboard from './components/Dashboard/Dashboard';
import PieChart from './components/Dashboard/Charts/PieChart';
import Companies from './components/Companies/Companies';
import ReportTasks from './components/Reports/Tasks/ReportTasks';
import FinanceItems from './components/FinanceItems/FinanceItems';
import Reports from './components/Reports/Reports';
import Projects from './components/Projects/Projects';
import Finance from './components/Reports/Finance/Finance';
import CompaniesReport from './components/Reports/CompaniesReport/CompaniesReport'; // Importar el nuevo componente
import Tasks from './components/Task/Tasks';
import ReportProjects  from './components/Reports/projects/Projects';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<MosaicPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pie-chart" element={<PieChart />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/finance-items/:projectId" element={<FinanceItems />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/projects" element={<ReportProjects />} />
        <Route path="/reports/tasks" element={<ReportTasks />} />
        <Route path="/reports/finance" element={<Finance />} />
        <Route path="/projects/:companyId" element={<Projects />} /> {/* Nueva ruta */}
        <Route path="/reports/companies" element={<CompaniesReport />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
};

export default App;