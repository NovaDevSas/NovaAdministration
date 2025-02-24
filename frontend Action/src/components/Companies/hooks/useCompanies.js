import { useState, useEffect } from 'react';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../../../services/companyService';

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompany, setNewCompany] = useState(initialCompanyState());

  // Estado inicial para una nueva compañía
  function initialCompanyState() {
    return {
      name: '',
      contact: '',
      status: 'activa',
      code: '',
      nit: '',
      email: '',
      address: '',
    };
  }

  // Validar campos obligatorios de la compañía
  const validateCompanyFields = (company) => {
    const requiredFields = ['name', 'contact', 'email', 'status'];
    const missingFields = requiredFields.filter((field) => !company[field]);

    if (missingFields.length) {
      console.warn('Campos obligatorios incompletos:', missingFields);
      return false;
    }

    if (!['activa', 'inactiva', 'lead'].includes(company.status?.trim().toLowerCase())) {
      console.warn('Estado inválido:', company.status);
      return false;
    }

    return true;
  };

  // Obtener compañías del backend
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(
        data.map((company) => ({
          ...company,
          status: company.status?.trim().toLowerCase(),
        }))
      );
    } catch (error) {
      console.error('Error al cargar empresas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Crear nueva compañía
  const handleCreateCompany = async () => {
    if (!validateCompanyFields(newCompany)) return;

    setLoading(true);
    try {
      const data = await createCompany(newCompany);
      setCompanies((prev) => [
        ...prev,
        { ...data, status: data.status?.trim().toLowerCase() },
      ]);
      resetForm();
    } catch (error) {
      console.error('Error al crear empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar compañía existente
  const handleUpdateCompany = async () => {
    if (!editingCompany || !validateCompanyFields(newCompany)) return;

    setLoading(true);
    try {
      const updatedCompany = await updateCompany(editingCompany._id, newCompany);
      setCompanies((prev) =>
        prev.map((company) =>
          company._id === editingCompany._id
            ? { ...updatedCompany, status: updatedCompany.status?.trim().toLowerCase() }
            : company
        )
      );
      resetForm();
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar compañía
  const handleDeleteCompany = async () => {
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteCompany(confirmDelete._id);
      setCompanies((prev) => prev.filter((company) => company._id !== confirmDelete._id));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  // Restablecer el formulario
  const resetForm = () => {
    setNewCompany(initialCompanyState());
    setEditingCompany(null);
    setIsModalOpen(false);
  };

  // Manejar edición de compañía
  const handleEditCompany = (company) => {
    setNewCompany(company);
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  return {
    companies,
    loading,
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
  };
};