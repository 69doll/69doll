import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import transformerDirectives from '@unocss/transformer-directives'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    React(),
    UnoCSS({
      transformers: [transformerDirectives()]
    }),
  ],
})
