import path from "path"
import {
  presetIcons,
  presetWind3,
  transformerCompileClass,
  transformerDirectives,
} from 'unocss'
import TailwindcssPlugin from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import ReactPlugin from '@vitejs/plugin-react'
import UnoCSSPlugin from 'unocss/vite'
import { analyzer as AnalyzerPlugin } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    proxy: {
      '/api': 'https://admin-69doll.veda-studios.com',
      // '/api': 'https://admin.69doll.arylo.cc',
      // '/api': 'https://proxy.69doll.arylo.cc/https://admin.69doll.arylo.cc',
      // '/api': 'https://proxy.69doll.arylo.cc/https://admin-69doll.veda-studios.com',
    },
  },
  plugins: [
    AnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      enabled: !process.env.CI,
    }),
    ReactPlugin(),
    TailwindcssPlugin(),
    UnoCSSPlugin({
      presets: [
        presetWind3(),
        presetIcons({ cdn: 'https://esm.sh/' }),
      ],
      transformers: [
        transformerDirectives(),
        transformerCompileClass(),
      ],
      shortcuts: {
        'flex-center': 'flex justify-center items-center',
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (id.includes('node_modules/es-toolkit')) return 'utils-chunk'
          if (id.includes('node_modules/crypto-js')) return 'crypto-chunk'
          if (id.includes('node_modules/dayjs')) return 'dayjs-chunk'
          if (id.includes('Doll69If')) return '69if-chunk'
        },
      }
    }
  },
})
