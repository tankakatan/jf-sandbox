import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => {
  const config = { plugins: [tailwindcss()] };
  if (command === 'serve') {
    // dev specific config
  } else {
    // command === 'build'
    // build specific config
  }
  return config;
});
