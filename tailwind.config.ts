import type { Config } from 'tailwindcss';

const config: Config = {
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/[locale]/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        dark: '#313638',
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'slide-right': 'slide-right 0.4s cubic-bezier(0.45, 1, 0.4, 1.2) both',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.45, 1, 0.4, 1.2) both',
        fade: 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;