// filepath: src/assets/icons/ReportsIcon.jsx
import React from "react";

const ReportsIcon = ({ size = 24, color = "currentColor", title = "Reports Icon" }) => (
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
    aria-labelledby="reportsIconTitle"
  >
    <title id="reportsIconTitle">{title}</title>
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
    <path d="M7 12h3M7 16h5M7 8h10" />
    <path d="M17 12v4a1 1 0 0 0 1 1h2" />
    <circle cx="17.5" cy="8.5" r="1.5" />
  </svg>
);

export default ReportsIcon;
