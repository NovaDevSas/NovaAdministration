import React from 'react';

const FinanceIcon = ({ size = 32, color = '#000' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
    <path d="M10 10h4M10 14h4" />
  </svg>
);

export default FinanceIcon;