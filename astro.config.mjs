// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

import playformCompress from '@playform/compress';

import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: 'standalone',
  }),

  server: {
    port: 4321,
    host: true,
  },

  integrations: [
    react(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    playformCompress({
      CSS: true,
      HTML: true,
    }),
    compressor({
      brotli: true,
      gzip: false,
    }),
  ],
});
