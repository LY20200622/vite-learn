import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      mine: "1920px",
      his: "2048px",
      her: "3840px",
    },
    extend: {},
    supports: {
      flex: "display: flex",
    },
    aria: {
      asc: 'sort="ascending"',
      desc: 'sort="descending"',
    },
    data: {
      diyName: 'myName~="LLL"',
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("two", "&:nth-child(2)");
    }),
  ],
};
