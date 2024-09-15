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
							color: "#818cf8",
						},
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
						pre: {
							backgroundColor: "#171717",
							color: "#ffffff",
						},
						code: {
							backgroundColor: "#0d1117",
							color: "#ffffff",
							fontWeight: "400",
							"border-radius": "0.25rem",
						},
						"code::before": {
							content: '""',
							"padding-left": "0.25rem",
						},
						"code::after": {
							content: '""',
							"padding-right": "0.25rem",
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