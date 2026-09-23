import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // The homepage chunk is emitted outside /assets so the server can gate it behind the access cookie.
        chunkFileNames: (chunk) =>
          chunk.name === 'HomePage' ? 'private/[name]-[hash].js' : 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3002,
  },
});
