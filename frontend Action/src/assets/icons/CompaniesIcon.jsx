import React from 'react';

const CompaniesIcon = ({ size = 32, color = '#000' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 2h18c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h18V4H3zm2 2h2v2H5V6zm0 4h2v2H5v-2zm0 4h2v2H5v-2zm4-8h2v2H9V6zm0 4h2v2H9v-2zm0 4h2v2H9v-2zm4-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
  </svg>
);

export default CompaniesIcon;