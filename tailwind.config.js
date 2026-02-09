/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Auth form colors - will use CSS variables for dynamic theming
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-pressed": "rgb(var(--color-primary-pressed) / <alpha-value>)",
        "primary-faded": "rgb(var(--color-primary-faded) / <alpha-value>)",
        "input-bg": "rgb(var(--color-input-bg) / <alpha-value>)",
        "input-border": "rgb(var(--color-input-border) / <alpha-value>)",
        placeholder: "rgb(var(--color-placeholder) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        "error-light": "rgb(var(--color-error-light) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "icon-bg": "rgb(var(--color-icon-bg) / <alpha-value>)",
        // Text colors
        foreground: "rgb(var(--color-text) / <alpha-value>)",
        // Layout colors
        divider: "rgb(var(--color-divider) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
