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
            "blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
            blockquote: {
              fontWeight: "400",
            },
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
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
              fontWeight: "400",
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
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};