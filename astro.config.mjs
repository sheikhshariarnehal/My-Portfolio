import { defineConfig } from 'astro/config';
// Sitemap generation handled via public/sitemap.xml for compatibility

// https://astro.build/config
export default defineConfig({
  site: 'https://sheikhshariarnehal.me',
  output: 'static',
  server: {
    port: 4322
  },
  integrations: [],
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{ protocol: 'https' }]
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild'
    }
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
