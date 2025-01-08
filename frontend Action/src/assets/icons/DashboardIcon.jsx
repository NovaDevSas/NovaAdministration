// filepath: src/assets/icons/DashboardIcon.jsx
import React from "react";

const DashboardIcon = ({ size = 24, color = "currentColor", title = "Dashboard Icon" }) => (
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
    aria-labelledby="dashboardIconTitle"
  >
    <title id="dashboardIconTitle">{title}</title>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="4" rx="1" />
    <rect x="14" y="10" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="3" rx="1" />
  </svg>
);

export default DashboardIcon;
