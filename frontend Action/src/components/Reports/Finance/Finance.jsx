import React from 'react';
import axios from 'axios';

const Finance = () => {
  const downloadPDF = async () => {
    const response = await axios.get('/api/finance-items/download/pdf', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'financeItems.pdf');
    document.body.appendChild(link);
    link.click();
  };

  const downloadExcel = async () => {
    const response = await axios.get('/api/finance-items/download/excel', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'financeItems.xlsx');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <button onClick={downloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Download PDF</button>
      <button onClick={downloadExcel} className="bg-green-500 text-white px-4 py-2 rounded-lg">Download Excel</button>
      {/* Aquí puedes agregar el contenido de tus finanzas */}
    </div>
  );
};

export default Finance;