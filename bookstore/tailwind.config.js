/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        primary: "#FF6600",
        secondary:"#FF9900",
        tertiary: "	#FFCC00",
        heading1: "#333333",
        heading2: "#444444",
        heading3: "#555555",
        subHeading: "#666666",
        body: "#777777",
        caption: "#888888"

      }
    },
  },
  plugins: [],
}
