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
import ProjectsTabs from './ProjectsTabs';
import { getCompanyById } from '../../services/companyService'; // Importar getCompanyById

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
  const [activeTab, setActiveTab] = useState('all');
  const toastId = useRef(null);

  const isEditing = !!editingProject;

  // Obtener el nombre de la empresa
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const company = await getCompanyById(companyId);
        setCompanyName(company?.name || 'Nombre no disponible');
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

  const filteredProjects = projects
    .filter((project) =>
      activeTab === 'all'
        ? project.name.toLowerCase().includes(searchQuery.toLowerCase())
        : project.status === activeTab && project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (a.status === 'inactivo' ? 1 : -1));

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const openModal = () => setIsModalOpen(true);

  const projectCounts = {
    all: projects.length,
    active: projects.filter((p) => p.status === 'active').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    'processing': projects.filter((p) => p.status === 'processing').length,
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
      
      {/* Botón para regresar */}
      <button
        onClick={() => navigate('/companies')}
        className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 z-10"
        title="Regresar a Companies"
        aria-label="Regresar a Companies"
      >
        ←
      </button>

      {/* Notificaciones */}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Contenido principal */}
      <div className={`relative z-10 max-w-7xl mx-auto p-6 ${loading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300'}`}>
        <ProjectsHeader
          companyName={companyName}
          filteredProjects={filteredProjects}
          onNewProject={openModal}
        />

        <ProjectsTabs activeTab={activeTab} handleTabChange={setActiveTab} projectCounts={projectCounts} />

        <div className="bg-white rounded-lg shadow-xl p-8 mt-6">
          <ProjectSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <ProjectsList projects={filteredProjects} onEdit={handleEditProject} onDelete={setConfirmDelete} />
        </div>
      </div>

      {/* Modal de confirmación */}
      {confirmDelete && (
        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDeleteProject={handleDeleteProject}
        />
      )}

      {/* Formulario de proyectos */}
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