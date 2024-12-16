import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      lineClamp:{
        3: '3'
      },
      colors: {
        text: {
          'color-black': '#000000',
          'color-green': '#58D674',
          'color-black-100': '#282828',
          'color-white': '#FFFFFF',
          'color-black-200': '#BDBDBD'
        },
        background: {
          'bg-white': '#FFFFFF',
          'bg-black': '#1F1F1F'
        },
        border: {
          'color-border': '.3px solid ',
          '.5px': '.5px'
          
        },
        btn: {
          'btn-color-black': '#000000',
          'btn-color-green': '#58D674'
        },
        dropShadow: {
          'btn-shadow-green': '3px 8px 10px 2px rgba(88, 214, 116, 0.3)',
          'btn-shadow-white': '0 1px 20px 0 rgba(0,0,0,0.1)'
        },
        hover: {
          'btn-green-hover': '#44b25c',
          'btn-white-hover': '0 1px 20px 0 rgba(0,0,0,0.15)'
        },
        color: {
          'grey': '#CCCCCC'
        }
        
      },

      fontFamily: {
        sans: ['Popins', 'sans-serif'],
        secular: ['Secular One', 'sans-serif'],
      },
      fontSize: {
        '60px': '60px',
        '24px': '24px',
        '20px': '20px',
        '18px': '18px',
        '12px': '12px'
      },
      fontWeight: {
        bold: '700',
        medium: '500',
        regular: '400'
      },
      borderRadius: {
        'xl': '1.25rem',
      },
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '1200px'
      },
     

    }
  },
  plugins: [],
};
export default config;



