import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPasswordPage from './components/ForgotPassword/ForgotPasswordPage';
import ResetPassword from './components/Auth/ResetPassword';
import MosaicPage from './components/Mosaic/MosaicPage';
import Dashboard from './components/Dashboard/Dashboard';
import PieChart from './components/Dashboard/Charts/PieChart';
import Companies from './components/Companies/Companies';
import Tasks from './components/Reports/Tasks/Tasks';
import FinanceItems from './components/FinanceItems/FinanceItems';
import Reports from './components/Reports/Reports';
import Projects from './components/Reports/projects/Projects';
import Finance from './components/Reports/Finance/Finance';
import Files from './components/Reports/Files/Files';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<MosaicPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pie-chart" element={<PieChart />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/projects" element={<Tasks />} />
        <Route path="/finance-items/:projectId" element={<FinanceItems />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/projects" element={<Projects />} />
        <Route path="/reports/tasks" element={<Tasks />} />
        <Route path="/reports/finance" element={<Finance />} />
        <Route path="/reports/files" element={<Files />} />
      </Routes>
    </Router>
  );
};

export default App;