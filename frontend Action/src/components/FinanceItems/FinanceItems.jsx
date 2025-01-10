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
    const fetchData = async () => {
      try {
        setLoading(true);
        const [items, project] = await Promise.all([
          getFinanceItems(projectId),
          getProjectById(projectId),
        ]);
        const company = await getCompanyById(project.companyId);
        setFinanceItems(items);
        setFilteredItems(items);
        setCompanyName(company?.name || 'Nombre no disponible');
      } catch (error) {
        console.error('Error inicializando datos:', error);
        toast.error('Error al cargar datos iniciales');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

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
        [item.name, item.description, item.type, item.amount.toString(), item.date]
          .some((field) => field.toLowerCase().includes(query))
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
      const savedItem = editingItem
        ? await updateFinanceItem(financeItem._id, financeItem)
        : await createFinanceItem(financeItem);
      const updatedItems = editingItem
        ? financeItems.map((item) =>
            item._id === savedItem._id ? savedItem : item
          )
        : [...financeItems, savedItem];
      setFinanceItems(updatedItems);
      setFilteredItems(updatedItems);
      toast.success(editingItem ? 'Ítem actualizado correctamente' : 'Ítem creado correctamente');
      closeModal();
    } catch (error) {
      console.error('Error al guardar ítem financiero:', error);
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
      console.error('Error al eliminar ítem financiero:', error);
      toast.error('Error al eliminar el ítem financiero');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-200 p-8">
      <div className="absolute inset-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(198, 239, 206, 0.6)"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,234.7C672,224,768,160,864,133.3C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      {/* Botón de regresar */}
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

      <div className={`relative z-10 max-w-7xl mx-auto ${loading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300'}`}>
        <FinanceItemsHeader openModal={openModal} />
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
            Ítems Financieros de {companyName}
          </h2>
          <FinanceItemsSearch searchQuery={searchQuery} handleSearch={handleSearch} />
          <FinanceItemsList financeItems={filteredItems} onEdit={openModal} onDelete={setConfirmDelete} />
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