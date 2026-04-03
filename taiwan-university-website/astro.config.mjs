import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://db.ryugaku101.com',
  output: 'static',
  build: { format: 'directory' },
  integrations: [sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
    json: { stringify: true },
    preview: { allowedHosts: ['ricky-omnibook.tail3a3559.ts.net'] },
  },
});
