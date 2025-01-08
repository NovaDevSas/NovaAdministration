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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 p-6 relative">
      {/* Botón para retornar a Home */}
      <button
        onClick={() => navigate('/home')}
        className="absolute top-6 left-32 flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
        title="Regresar a Home"
        aria-label="Regresar a Home"
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
            <div className="w-6 h-6 border-4 border-purple-500 border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-300">Cargando...</span>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${loading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300'}`}>
        {/* Encabezado */}
        <CompanyHeader onNewCompany={() => setIsModalOpen(true)} />

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <div className="mb-6">
            <CompanySearch
              searchQuery={searchQuery}
              onSearchChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

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
