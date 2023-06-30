import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

console.log(process.env.BASE);
export default defineConfig({
  plugins: [sveltekit()],
  base: process.env.NODE_ENV === 'development' ? '' : process.env.BASE
});
