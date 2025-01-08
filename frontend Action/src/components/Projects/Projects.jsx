import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProjects } from './hooks/useProjects';
import ProjectsHeader from './ProjectsHeader';
import ProjectSearch from './ProjectSearch';
import ProjectsList from './ProjectsList';
import ProjectForm from './ProjectForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { getCompanyById } from '../../services/companyService';

const Projects = () => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const {
    projects,
    loading: projectsLoading,
    confirmDelete,
    searchQuery,
    isModalOpen,
    editingProject,
    newProject,
    setSearchQuery,
    setIsModalOpen,
    setConfirmDelete,
    handleCreateProject,
    handleUpdateProject,
    handleDeleteProject,
    handleEditProject,
    resetForm,
    setNewProject,
  } = useProjects(companyId);

  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('Cargando nombre...');
  const toastId = useRef(null);

  // Obtener el nombre de la empresa
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const company = await getCompanyById(companyId);
        if (company?.name) {
          setCompanyName(company.name);
        } else {
          setCompanyName('Nombre no disponible');
        }
      } catch (error) {
        console.error('Error fetching company name:', error);
        setCompanyName('Error al cargar el nombre');
      }
    };

    fetchCompanyName();
  }, [companyId]);

  // Notificaciones de proyectos cargados
  useEffect(() => {
    if (projects.length > 0 && !toast.isActive(toastId.current)) {
      toastId.current = toast.info(`Se cargaron ${projects.length} proyectos.`, {
        toastId: 'projects-loaded',
      });
    }
  }, [projects]);

  // Sincronizar el estado de carga con el hook
  useEffect(() => {
    setLoading(projectsLoading);
  }, [projectsLoading]);

  const isEditing = !!editingProject;

  const filteredProjects = projects
    .filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.status === 'inactivo' ? 1 : -1));

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 p-8 relative">
      <button
        onClick={() => navigate('/companies')}
        className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
        title="Regresar a Companies"
        aria-label="Regresar a Companies"
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
        <ProjectsHeader companyName={companyName} filteredProjects={filteredProjects} onNewProject={openModal} />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <ProjectSearch
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
          />
          <ProjectsList
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={setConfirmDelete}
          />
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteProject={handleDeleteProject}
        />
      )}

      {isModalOpen && (
        <ProjectForm
          project={newProject}
          onChange={(e) =>
            setNewProject({ ...newProject, [e.target.name]: e.target.value })
          }
          onSave={isEditing ? handleUpdateProject : handleCreateProject}
          onCancel={resetForm}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Projects;