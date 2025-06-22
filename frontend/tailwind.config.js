import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Text glyphs
        stix: ['"STIX Two Text"', "serif"],
        // Math glyphs + fallback to text glyphs
        "stix-math": ['"STIX Two Math"', '"STIX Two Text"', "serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes: ["emerald"]
  }
}