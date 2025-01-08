import React from 'react';

const CompanyIcon = ({ size = 24, color = "currentColor", title = "Company Icon" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
    width={size}
    height={size}
    role="img"
    aria-labelledby="companyIconTitle"
  >
    <title id="companyIconTitle">{title}</title>
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

export default CompanyIcon;