import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const ProjectSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex justify-center items-center my-6">
      <div className="relative w-full max-w-lg mx-auto">
        <label htmlFor="project-search" className="sr-only">
          Buscar proyectos
        </label>
        <input
          id="project-search"
          type="text"
          placeholder="Buscar proyectos..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaSearch />
        </div>
      </div>
    </div>
  );
};

ProjectSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default ProjectSearch;