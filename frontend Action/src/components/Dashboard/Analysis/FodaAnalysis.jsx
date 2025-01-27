import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopIncomes from './TopIncomes';
import TopExpenses from './TopExpenses';
import TopPerformance from './TopPerformance';
import TotalIncomePieChart from './TotalIncomePieChart';

const FodaAnalysis = () => {
  const [topIncomes, setTopIncomes] = useState([]);
  const [topExpenses, setTopExpenses] = useState([]);
  const [topPerformance, setTopPerformance] = useState([]);
  const [totalIncomeData, setTotalIncomeData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/companies/finance-summary`);
        const companies = response.data;

        console.log('Companies data:', companies);

        const sortedByIncome = [...companies].sort((a, b) => b.totalIncome - a.totalIncome).slice(0, 5);
        const sortedByExpense = [...companies].sort((a, b) => b.totalExpenses - a.totalExpenses).slice(0, 5);
        const sortedByPerformance = [...companies].sort((a, b) => (b.totalIncome - b.totalExpenses) - (a.totalIncome - a.totalExpenses)).slice(0, 5);

        setTopIncomes(sortedByIncome);
        setTopExpenses(sortedByExpense);
        setTopPerformance(sortedByPerformance);

        const labels = companies.map(company => company.company.name);
        const incomeData = companies.map(company => company.totalIncome);

        setTotalIncomeData({
          labels,
          datasets: [
            {
              label: 'Ingresos Totales',
              data: incomeData,
              backgroundColor: [
                '#4CAF50', // Verde
                '#36A2EB', // Azul
                '#FF6384', // Rojo
                '#FFCE56', // Amarillo
                '#9966FF', // Morado
              ],
              hoverBackgroundColor: [
                '#388E3C', // Verde más oscuro
                '#0288D1', // Azul más oscuro
                '#D32F2F', // Rojo más oscuro
                '#FBC02D', // Amarillo más oscuro
                '#7B1FA2', // Morado más oscuro
              ],
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <TopIncomes data={topIncomes} />
      <TopExpenses data={topExpenses} />
      <TopPerformance data={topPerformance} />
      <TotalIncomePieChart data={totalIncomeData} />
    </div>
  );
};

export default FodaAnalysis;