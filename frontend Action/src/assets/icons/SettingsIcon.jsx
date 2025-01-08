// filepath: src/assets/icons/CompanyIcon.jsx
import React from "react";

const CompanyIcon = ({ size = 24, color = "currentColor", title = "Company Icon" }) => (
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
    aria-labelledby="companyIconTitle"
  >
    <title id="companyIconTitle">{title}</title>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M7 9h4M7 12h2M7 15h4M13 9h4M13 12h4M13 15h2" />
    <path d="M10 21v-2a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" />
  </svg>
);

export default CompanyIcon;
