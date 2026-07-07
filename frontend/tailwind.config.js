/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // Hijau kesehatan
        secondary: "#e0f2fe", // Biru lembut
        background: "#f8fafc", // Putih/abu terang
        warning: "#f97316", // Orange
        danger: "#ef4444", // Merah
        success: "#22c55e", // Hijau
      }
    },
  },
  plugins: [],
}