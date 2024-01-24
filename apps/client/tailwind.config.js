const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}",
    ),
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["var(--font-Poppins)"],
        Inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [nextui()],
};
