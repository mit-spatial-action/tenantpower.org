import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client-src',

  build: {
    outDir: '../public',
    emptyOutDir: false,
    rollupOptions: {
      input: 'client-src/main.js',
      output: {
        entryFileNames: 'js/bundle.js',
        assetFileNames: 'css/style.css'
      }
    }
  },

  server: {
    proxy: {
      '/props': 'http://localhost:3000',
    }
  },
  
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'client-src/img/*', dest: 'img/' }
      ]
    })
  ]
});