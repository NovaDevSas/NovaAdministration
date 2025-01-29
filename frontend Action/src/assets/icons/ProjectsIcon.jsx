// filepath: /c:/Proyectos/projectgithub/NovaAdministration/frontend Action/src/assets/icons/ProjectsIcon.jsx
import React from 'react';

const ProjectsIcon = ({ size = 24, color = 'currentColor', title = 'Projects Icon' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    role="img"
    aria-labelledby="projectsIconTitle"
  >
    <title id="projectsIconTitle">{title}</title>
    <path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2" />
    <path d="M3 7h18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
  </svg>
);

export default ProjectsIcon;