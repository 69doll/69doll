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

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [
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
})
