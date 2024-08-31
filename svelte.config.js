import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import {mdsvex} from 'mdsvex';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: adapter()
  },
  preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })]
};
export default config;