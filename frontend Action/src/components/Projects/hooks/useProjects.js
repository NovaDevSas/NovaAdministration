import { useState, useEffect } from 'react';
import { getProjectsByCompany, createProject, updateProject, deleteProject } from '../../../services/projectService';

export const useProjects = (companyId) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const initialProjectState = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    companyId, // Asociar correctamente el ID de la empresa
    status: 'active',
    budget: 0,
  };

  const [newProject, setNewProject] = useState(initialProjectState);

  // Obtener la lista de proyectos por ID de empresa
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjectsByCompany(companyId);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyId) fetchProjects();
  }, [companyId]);

  // Crear un nuevo proyecto
  const handleCreateProject = async () => {
    setLoading(true);
    try {
      const newProjectData = await createProject(newProject);
      setProjects((prev) => [...prev, newProjectData]);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un proyecto existente
  const handleUpdateProject = async () => {
    if (!editingProject) return;

    setLoading(true);
    try {
      const updatedProject = await updateProject(editingProject._id, newProject);
      setProjects((prev) =>
        prev.map((proj) => (proj._id === updatedProject._id ? updatedProject : proj))
      );
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un proyecto
  const handleDeleteProject = async (projectId) => {
    setLoading(true);
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((proj) => proj._id !== projectId));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setLoading(false);
    }
  };

  // Editar un proyecto existente
  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({
      ...project,
      startDate: project.startDate?.split('T')[0] || '', // Formato ISO simplificado
      endDate: project.endDate?.split('T')[0] || '',
    });
    setIsModalOpen(true);
  };

  // Resetear el formulario
  const resetForm = () => {
    setNewProject(initialProjectState);
    setEditingProject(null);
    setIsModalOpen(false);
  };

  return {
    projects,
    loading,
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
    fetchProjects,
  };
};