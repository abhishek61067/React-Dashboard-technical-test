/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#4E42D9",
        primaryHover: "#4A33CC",
        accentOrange: "#FFF2F2",
        accentBlue: "#E2F3FF",
        accentYellow: "#FDFBDA",
        accentPurple: "#FFE7FB",
        textPrimary: "#1F1F1F",
        textSecondary: "#666666",
        footerBg: "#292838",
        footerText: "#C4C4C4",
        paragraph: "#797979",
        title: "#3B3950",
        primaryLight: "#4E42D92E",
        lastFooter: "#23222F",
      },
      fontSize: {
        h1: ["2.45rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        h2: ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        h3: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        sm: "16px",
        md: "18px",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "1rem",
        sm: "4px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
        button: "0 2px 8px rgba(91, 63, 255, 0.3)",
      },
      textShadow: {
        sm: "0px 1px 2px rgba(0,0,0,0.25)",
        md: "0px 2px 3px rgba(0,0,0,0.25)",
        lg: "0px 4px 4px rgba(0,0,0,0.25)",
      },
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const shadows = theme("textShadow");
      const utilities = Object.keys(shadows).map((key) => ({
        [`.text-shadow-${key}`]: { textShadow: shadows[key] },
      }));
      addUtilities(utilities);
    },
  ],
};
