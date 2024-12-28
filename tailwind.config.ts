import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5FF46B',
        secondary: '#19C03C',
        button: '#1B1B1B',
        danger:"#CC4628",
        textPrimary:"#343D45"
        
      },
    },
  },
  plugins: [],
} satisfies Config;
