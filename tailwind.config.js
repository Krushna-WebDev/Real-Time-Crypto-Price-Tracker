export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gray-750': '#2d3748',
        'gray-850': '#1a202c',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  prefix: '',
  shortcuts: {
    'btn': 'px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors',
    'card': 'bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700',
  },
} 