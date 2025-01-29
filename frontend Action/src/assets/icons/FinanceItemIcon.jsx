import React from "react";

const FinanceItemIcon = ({ size = 24, color = "currentColor", title = "Finance Item Icon" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
    width={size}
    height={size}
    role="img"
    aria-labelledby="financeItemIconTitle"
  >
    <title id="financeItemIconTitle">{title}</title>
    <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 20c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9zm.5-13h-1v1h1c.828 0 1.5.672 1.5 1.5S13.328 12 12.5 12h-1v1h1c.828 0 1.5.672 1.5 1.5S13.328 16 12.5 16h-1v1h-1v-1h-1v-1h1v-1h-1c-.828 0-1.5-.672-1.5-1.5S10.672 10 11.5 10h1V9h-1c-.828 0-1.5-.672-1.5-1.5S10.672 6 11.5 6h1V5h1v1h1v1h-1v1z"/>
  </svg>
);

export default FinanceItemIcon;