import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCompanies } from './hooks/useCompanies';
import CompanyHeader from './components/CompanyHeader';
import CompanySearch from './components/CompanySearch';
import CompanyList from './components/CompanyList';
import CompanyForm from './components/CompanyForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const Companies = () => {
  const navigate = useNavigate();
  const {
    companies,
    loading: companiesLoading,
    confirmDelete,
    searchQuery,
    isModalOpen,
    editingCompany,
    newCompany,
    setSearchQuery,
    setIsModalOpen,
    setConfirmDelete,
    handleCreateCompany,
    handleUpdateCompany,
    handleDeleteCompany,
    handleEditCompany,
    resetForm,
    setNewCompany,
  } = useCompanies();

  const [loading, setLoading] = useState(false);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    setLoading(companiesLoading);
  }, [companiesLoading]);

  useEffect(() => {
    if (companies.length > 0 && !notified) {
      toast.info(`Se cargaron ${companies.length} empresas.`, { toastId: 'companies-loaded' });
      setNotified(true);
    }
  }, [companies, notified]);

  const isEditing = !!editingCompany;

  const filteredCompanies = companies
    .filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.status === 'inactiva' ? 1 : -1));

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 relative overflow-hidden flex flex-col">
      {/* Fondo dinámico */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(198, 239, 206, 0.6)"
            d="M0,64L48,96C96,128,192,192,288,213.3C384,235,480,213,576,176C672,139,768,85,864,69.3C960,53,1056,75,1152,112C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Botón para retornar a Home */}
      <button
        onClick={() => navigate('/home')}
        className="absolute top-6 left-6 w-10 h-10 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-transform hover:scale-110 focus:ring-2 focus:ring-purple-500 focus:outline-none z-10"
        title="Regresar a Home"
      >
        ←
      </button>

      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Indicador de carga */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-purple-500 border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-300">Cargando...</span>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto p-6 ${loading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300 z-10'}`}>
        {/* Encabezado */}
        <CompanyHeader onNewCompany={() => setIsModalOpen(true)} />

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <CompanySearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          <CompanyList
            companies={filteredCompanies}
            onEdit={handleEditCompany}
            onDelete={setConfirmDelete}
          />
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {confirmDelete && (
        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteCompany={() => {
            handleDeleteCompany(confirmDelete._id);
            toast.success('Empresa eliminada exitosamente.', { toastId: 'delete-success' });
          }}
        />
      )}

      {/* Modal para crear/editar compañía */}
      {isModalOpen && (
        <CompanyForm
          company={newCompany}
          onChange={(e) =>
            setNewCompany({ ...newCompany, [e.target.name]: e.target.value })
          }
          onSave={() => {
            const action = editingCompany ? handleUpdateCompany : handleCreateCompany;
            action();
            toast.success(
              editingCompany
                ? 'Empresa actualizada exitosamente.'
                : 'Empresa creada exitosamente.',
              { toastId: editingCompany ? 'update-success' : 'create-success' }
            );
          }}
          onCancel={resetForm}
          isEditing={!!editingCompany}
        />
      )}
    </div>
  );
};

export default Companies;