import { defineConfig } from 'vite'
import ReactPlugin from '@vitejs/plugin-react'
import UnoCSSPlugin from 'unocss/vite'
import { presetWind3, presetIcons, transformerDirectives } from 'unocss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ReactPlugin(),
    UnoCSSPlugin({
      presets: [
        presetWind3(),
        presetIcons({ cdn: 'https://esm.sh/' }),
      ],
      transformers: [transformerDirectives()],
      shortcuts: {
        'flex-row-nowrap': 'flex flex-row flex-nowrap',
        'flex-col-nowrap': 'flex flex-col flex-nowrap',
        'flex-row-wrap': 'flex flex-row flex-wrap',
        'flex-col-wrap': 'flex flex-col flex-wrap',
      },
    }),
  ],
})
