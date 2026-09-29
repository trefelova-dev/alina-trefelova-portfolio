/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/block.json"
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        cream: 'var(--bg-professional-color, #FFF4E4)',
        dark: 'var(--text-professional-color, #141414)',
        accent: 'var(--accent-professional-color, #68191E)',
        accentSecond: 'var(--second-professional-color, #A9232B)',
        surfaceDark: 'var(--light-professional-color, #28282A)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'system-ui', 'monospace'],
      },
      borderRadius: {
        card: 'var(--border-radius-card, 1.25rem)',
        tag: 'var(--border-radius-tag, 0.25rem)',
        other: 'var(--border-radius-other, 1rem)',
      },
      maxWidth: {
        container: 'var(--container-width, 76.5rem)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};