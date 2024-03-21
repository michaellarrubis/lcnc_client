/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.',
  server: {
    watch: {
      usePolling: true,
    },
    host: '0.0.0.0',
    strictPort: true,
    port: 3002, 
  },

  build: {
    outDir: '../dist'
  },

  plugins: [react()],

  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      }
    }
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
      '@baseComponents': `${path.resolve(__dirname, './src/components/base')}`,
      '@baseHooks': `${path.resolve(__dirname, './src/hooks/base')}`,
      '@baseLayouts': `${path.resolve(__dirname, './src/layouts/base')}`,
      '@basePages': `${path.resolve(__dirname, './src/pages/base')}`,
      '@baseStores': `${path.resolve(__dirname, './src/store/modules/base')}`,
      '@baseUtils': `${path.resolve(__dirname, './src/utils/base')}`
    }
  }
});
