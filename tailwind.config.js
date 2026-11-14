/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // PALETA: troque estes valores para mudar as cores do app inteiro.
      colors: {
        azul: { 950: '#081629', 900: '#0b1f3a', 800: '#12305a', 700: '#1b4580', 200: '#c9d8ee', 100: '#e6edf7' },
        ouro: { 700: '#8a6b22', 600: '#a8842f', 500: '#c9a24d', 300: '#e6cf94', 200: '#eedcae', 100: '#f6ecd2' },
        creme: { DEFAULT: '#f7f4ee', 50: '#fbf9f5' },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: { card: '0 6px 24px -10px rgba(11,31,58,.25)' },
    },
  },
  plugins: [],
}
