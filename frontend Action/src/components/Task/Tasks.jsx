import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTasks, deleteTask } from '../../services/taskService';
import { getProjects } from '../../services/projectService';
import { getUsers } from '../../services/userService';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import TaskPopup from './TaskPopup';
import TaskActions from './TaskActions';

const Tasks = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProjectIds, setExpandedProjectIds] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchProjectsTasksAndUsers = async () => {
      try {
        const [projectsData, tasksData, usersData] = await Promise.all([getProjects(), getTasks(), getUsers()]);
        setProjects(projectsData);
        setTasks(tasksData);
        setUsers(usersData);
      } catch (error) {
        toast.error('Error al obtener los proyectos, tareas y usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsTasksAndUsers();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tasksByProject = filteredProjects.reduce((acc, project) => {
    acc[project._id] = tasks.filter((task) => task.projectId === project._id);
    return acc;
  }, {});

  const toggleProjectExpansion = (projectId) => {
    setExpandedProjectIds((prevExpandedProjectIds) =>
      prevExpandedProjectIds.includes(projectId)
        ? prevExpandedProjectIds.filter((id) => id !== projectId)
        : [...prevExpandedProjectIds, projectId]
    );
  };

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : 'Desconocido';
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const closeTaskPopup = () => {
    setSelectedTask(null);
    setIsPopupOpen(false);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsPopupOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success('Tarea eliminada exitosamente');
    } catch (error) {
      toast.error('Error al eliminar la tarea');
    }
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100';
      case 'in-progress':
        return 'bg-blue-100';
      case 'completed':
        return 'bg-green-100';
      case 'cancelled':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const currentUser = JSON.parse(localStorage.getItem('user'));

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
        onClick={() => navigate('/home')}
        className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-400 z-10"
        title="Regresar al Home"
        aria-label="Regresar al Home"
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
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Proyectos y Tareas</h1>
        </header>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-gray-600">No se encontraron proyectos.</p>
        ) : (
          <ul className="space-y-4">
            {filteredProjects.map((project) => (
              <li key={project._id} className="p-4 border border-gray-300 rounded-lg bg-gradient-to-r from-green-50 to-white shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-purple-700">{project.name}</h2>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleProjectExpansion(project._id)}
                      className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      {expandedProjectIds.includes(project._id) ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <TaskActions
                      onAdd={handleAddTask}
                      onDelete={handleDeleteTask}
                      selectedTask={selectedTask}
                    />
                  </div>
                </div>
                {expandedProjectIds.includes(project._id) && (
                  <ul className="mt-2 space-y-2">
                    {tasksByProject[project._id].length === 0 ? (
                      <li className="text-gray-500">No hay tareas para este proyecto.</li>
                    ) : (
                      tasksByProject[project._id].map((task) => (
                        <li
                          key={task._id}
                          className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-200 shadow-sm ${getStatusColor(task.status)}`}
                          onClick={() => handleTaskClick(task)}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-indigo-600">{task.name}</h3>
                            <div className="text-right">
                              <p className="text-gray-600">{new Date(task.estimatedCompletionDate).toLocaleDateString()} - {task.status} - {getUserNameById(task.assignedTo)}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 mt-2">{task.description}</p>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popup de detalles de la tarea */}
      {isPopupOpen && (
        <TaskPopup
          task={selectedTask}
          users={users}
          onClose={closeTaskPopup}
          onUpdate={updateTask}
          onCreate={(newTask) => setTasks([...tasks, newTask])}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Tasks;