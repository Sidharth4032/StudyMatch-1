import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8000,
    watch: {
      usePolling: true,
    },
    // Configure proxy for API requests
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // Setup aliases
    alias: {
      '@': resolve(__dirname, 'src'),
      'components': resolve(__dirname, 'src/components'),
    }
  },
  css: {
    // CSS pre-processor options
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  build: {
    // Custom build options
    outDir: 'build',
    sourcemap: true, 
  },
  // Define global constants for the client-side
  define: {
    'process.env': process.env,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['some-big-dependency']
  }
});
