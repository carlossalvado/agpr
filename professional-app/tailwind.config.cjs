module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    '../**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          600: '#1D4ED8'
        },
        success: '#10B981',
        warning: '#FB923C',
        danger: '#EF4444',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px'
      },
      spacing: {
        '72': '18rem',
        '84': '21rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
