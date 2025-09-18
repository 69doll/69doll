import path from "path"
import TailwindcssPlugin from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import ReactPlugin from '@vitejs/plugin-react'
import UnoCSSPlugin from 'unocss/vite'
import { presetWind3, presetIcons, transformerDirectives } from 'unocss'

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
      transformers: [transformerDirectives()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
