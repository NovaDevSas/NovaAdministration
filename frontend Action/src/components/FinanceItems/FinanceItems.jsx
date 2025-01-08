import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFinanceItems, createFinanceItem, updateFinanceItem, deleteFinanceItem } from '../../services/financeItemService';
import { getCompanyById } from '../../services/companyService';
import { getProjectById } from '../../services/projectService';
import FinanceItemsHeader from './FinanceItemsHeader';
import FinanceItemsSearch from './FinanceItemsSearch';
import FinanceItemsList from './FinanceItemsList';
import FinanceItemForm from './FinanceItemForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const initialFinanceItemState = (projectId) => ({
  name: '',
  type: 'expense',
  projectId: projectId || '',
  frequency: 'one-time',
  amount: 0,
  description: '',
  date: '',
  discounts: 0,
  costs: 0,
  income: 0,
});

const FinanceItems = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [financeItems, setFinanceItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [financeItem, setFinanceItem] = useState(initialFinanceItemState(projectId));
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('Cargando nombre...');
  const toastId = useRef(null);

  useEffect(() => {
    fetchFinanceItems();
    fetchCompanyName();
  }, [projectId]);

  const fetchFinanceItems = async () => {
    setLoading(true);
    try {
      const data = await getFinanceItems(projectId);
      setFinanceItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching finance items:', error);
      toast.error('Error al cargar los ítems financieros');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyName = async () => {
    try {
      const project = await getProjectById(projectId);
      const companyId = project.companyId;
      const company = await getCompanyById(companyId);
      setCompanyName(company?.name || 'Nombre no disponible');
    } catch (error) {
      console.error('Error fetching company name:', error);
      setCompanyName('Error al cargar el nombre');
    }
  };

  useEffect(() => {
    if (financeItems.length > 0 && !toast.isActive(toastId.current)) {
      toastId.current = toast.info(`Se cargaron ${financeItems.length} ítems financieros.`, {
        toastId: 'finance-items-loaded',
      });
    }
  }, [financeItems]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredItems(
      financeItems.filter((item) =>
        [item.name, item.description].some((field) => field.toLowerCase().includes(query))
      )
    );
  };

  const openModal = (item = null) => {
    setFinanceItem(item ? { ...item, projectId } : initialFinanceItemState(projectId));
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const saveFinanceItem = async () => {
    setLoading(true);
    try {
      console.log('FinanceItem before save:', financeItem); // Verificar el objeto financeItem antes de guardar
      const saveAction = editingItem ? updateFinanceItem : createFinanceItem;
      const savedItem = await saveAction(financeItem._id, financeItem);
      let updatedItems;
      if (editingItem) {
        updatedItems = financeItems.map((item) => (item._id === savedItem._id ? savedItem : item));
      } else {
        updatedItems = [...financeItems, savedItem];
      }
      setFinanceItems(updatedItems);
      setFilteredItems(updatedItems);
      toast.success(editingItem ? 'Ítem actualizado correctamente' : 'Ítem creado correctamente');
      closeModal();
    } catch (error) {
      console.error('Error saving finance item:', error);
      toast.error('Error al guardar el ítem financiero');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await deleteFinanceItem(confirmDelete._id);
      const updatedItems = financeItems.filter((item) => item._id !== confirmDelete._id);
      setFinanceItems(updatedItems);
      setFilteredItems(updatedItems);
      toast.success('Ítem financiero eliminado correctamente');
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting finance item:', error);
      toast.error('Error al eliminar el ítem financiero');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 p-8 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
        title="Regresar"
        aria-label="Regresar"
      >
        ←
      </button>

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

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-6 border-4 border-purple-500 border-opacity-50 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-300">Cargando...</span>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${loading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300'}`}>
        <FinanceItemsHeader openModal={openModal} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
            Ítems Financieros de {companyName}
          </h2>
          <FinanceItemsSearch searchQuery={searchQuery} handleSearch={handleSearch} />
          <FinanceItemsList items={filteredItems} onEdit={openModal} onDelete={setConfirmDelete} />
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteItem={handleDeleteItem}
        />
      )}

      {isModalOpen && (
        <FinanceItemForm
          financeItem={financeItem}
          onChange={(e) =>
            setFinanceItem({ ...financeItem, [e.target.name]: e.target.value })
          }
          onSave={saveFinanceItem}
          onCancel={closeModal}
          isEditing={!!editingItem}
        />
      )}
    </div>
  );
};

export default FinanceItems;