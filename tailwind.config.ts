import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        findme: {
          green: "#16A34A",
          blue: "#2563EB",
          background: "#F9FAFB",
          text: "#111827",
        },
      },
    },
  },
  plugins: [],
};

export default config;
