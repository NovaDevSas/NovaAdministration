module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5fb6ad',
        secondary: '#f39c12',
        'primary-hover': '#4a908a',
        'dark-bg': '#2d2d2d',
        'dark-text': '#ffffff',
        'dark-primary': '#4a90e2',
        'dark-primary-hover': '#357ABD',
        'dark-secondary': '#777269',
        'dark-border': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};