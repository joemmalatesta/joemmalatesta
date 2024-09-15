/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
        light: '#f2f2f2'
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#f2f2f2",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              transition: "text-underline-offset 0.2s ease-in-out",
              "&:hover": {
                textUnderlineOffset: "4px",
              },
            },
            h4: {
              textDecoration: "none",
            },
            // Styling for inline code
            'code:not(pre code)': {
              backgroundColor: "#0d1117",
              color: "#ffffff",
              fontWeight: "400",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
            },
            // Remove default padding for inline code
            'code::before': {
              content: '""',
              padding: "0",
            },
            'code::after': {
              content: '""',
              padding: "0",
            },
          },
        },
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            pre: {
              backgroundColor: "#171717",
              color: "#ffffff",
            },
            // Styling for block code (inside pre tags)
            'pre code': {
              backgroundColor: "transparent",
              color: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              padding: "0",
            },
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};