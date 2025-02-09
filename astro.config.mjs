// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import react from '@astrojs/react';

import playformCompress from '@playform/compress';

import compressor from 'astro-compressor';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://colpyp.com',
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
    playformCompress({
      CSS: true,
      HTML: true,
    }),
    compressor({
      brotli: true,
      gzip: true,
    }),
    sitemap({
      customPages: [
        'https://colpyp.com/barranquilla',
        'https://colpyp.com/santa%20marta',
        'https://colpyp.com/bogota',
        'https://colpyp.com/medellin',
        'https://colpyp.com/cali',
        'https://colpyp.com/bucaramanga',
        'https://colpyp.com/cartagena',
        'https://colpyp.com/pereira',
        'https://colpyp.com/manizales',
        'https://colpyp.com/armenia',
        'https://colpyp.com/ibague',
        'https://colpyp.com/pasto',
        'https://colpyp.com/cucuta',
        'https://colpyp.com/neiva',
        'https://colpyp.com/villavicencio',
        'https://colpyp.com/monteria',
        'https://colpyp.com/sincelejo',
        'https://colpyp.com/popayan',
        'https://colpyp.com/tunja',
        'https://colpyp.com/valledupar',
        'https://colpyp.com/florencia',
        'https://colpyp.com/riohacha',
        'https://colpyp.com/quibdo',
      ],
    }),
  ],
});
