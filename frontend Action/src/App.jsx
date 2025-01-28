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
import Reports from './components/Reports/Reports';
import Companies from './components/Companies/Companies';
import Tasks from './components/Task/Tasks';
import FinanceItems from './components/FinanceItems/FinanceItems';

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
        <Route path="/reports" element={<Reports />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/projects" element={<Tasks />} />
        <Route path="/finance-items/:projectId" element={<FinanceItems />} />
      </Routes>
    </Router>
  );
};

export default App;