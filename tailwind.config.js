/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F7FA',
        exec: {
          critical: '#D9383A',
          warning: '#D99B26',
          safe: '#4B8359',
          cyan: '#0284C7',
          blue: '#2563EB',
          text: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          border: 'rgba(226, 232, 240, 0.8)',
          glassBorder: 'rgba(255, 255, 255, 0.7)',
        }
      },
      boxShadow: {
        'ambient': '0 12px 40px rgba(15, 23, 42, 0.08)',
        'elevated': '0 18px 50px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}
