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
        'bg-main': 'bg-black/90',
        'bg-main-rev': 'bg-white',
        'bg-main-hover': 'bg-gray/75',
        'bg-active': 'bg-red/75',
        'bg-active-hover': 'bg-red/90',
        'color-main': 'color-white/90',
        'color-main-rev': 'color-black/90',
        'color-main-active': 'color-main',
        'color-icon-main': 'bg-main-rev',
        'color-hint': 'color-gray/75',
        'color-hint-hover': 'color-gray/905',
        'border-main': 'border-white',
        'border-main-rev': 'border-black',
        'border-active': 'border-red/75',
        'border-active-hover': 'border-red/90',
      },
    }),
  ],
})
