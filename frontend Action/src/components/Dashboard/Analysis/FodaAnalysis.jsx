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

        const sortedByIncome = [...companies].sort((a, b) => b.totalIncome - a.totalIncome).slice(0, 5);
        const sortedByExpense = [...companies].sort((a, b) => b.totalExpenses - a.totalExpenses).slice(0, 5);
        const sortedByPerformance = [...companies].sort((a, b) => (b.totalIncome - b.totalExpenses) - (a.totalIncome - a.totalExpenses)).slice(0, 5);

        setTopIncomes(sortedByIncome);
        setTopExpenses(sortedByExpense);
        setTopPerformance(sortedByPerformance);

        const labels = companies.map((company) => company.company.name);
        const incomeData = companies.map((company) => company.totalIncome);

        setTotalIncomeData({
          labels,
          datasets: [
            {
              label: 'Ingresos Totales',
              data: incomeData,
              backgroundColor: [
                '#A5D6A7', // Verde pastel
                '#90CAF9', // Azul pastel
                '#FFAB91', // Rojo pastel
                '#FFE082', // Amarillo pastel
                '#CE93D8', // Morado pastel
              ],
              hoverBackgroundColor: [
                '#81C784', // Verde más oscuro
                '#64B5F6', // Azul más oscuro
                '#FF8A65', // Rojo más oscuro
                '#FFD54F', // Amarillo más oscuro
                '#BA68C8', // Morado más oscuro
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
        <p className="mt-4 text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center bg-red-100 p-4 rounded-lg shadow-md">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
      <TopIncomes data={topIncomes} />
      <TopExpenses data={topExpenses} />
      <TopPerformance data={topPerformance} />
      <TotalIncomePieChart data={totalIncomeData} />
    </div>
  );
};

export default FodaAnalysis;
