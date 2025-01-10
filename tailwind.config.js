/** @type {import('tailwindcss').Config} */

import customPreset from './src/assets/preset/customPreset'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    // fontFamily: {
    //   sans: ['Golos', 'sans-serif'],
    // },
    extend: {
      colors: {
        'primary': customPreset.primitive.sky,
        'surface-light': customPreset.semantic.colorScheme.light.surface,
        'surface-dark': customPreset.semantic.colorScheme.dark.surface,
        'emerald': customPreset.primitive.emerald,
        'green': customPreset.primitive.green,
        'lime': customPreset.primitive.lime,
        'red': customPreset.primitive.red,
        'orange': customPreset.primitive.orange,
        'amber': customPreset.primitive.amber,
        'yellow': customPreset.primitive.yellow,
        'teal': customPreset.primitive.teal,
        'cyan': customPreset.primitive.cyan,
        'sky': customPreset.primitive.sky,
        'blue': customPreset.primitive.blue,
        'indigo': customPreset.primitive.indigo,
        'violet': customPreset.primitive.violet,
        'purple': customPreset.primitive.purple,
        'fuchsia': customPreset.primitive.fuchsia,
        'pink': customPreset.primitive.pink,
        'rose': customPreset.primitive.rose,
        'slate': customPreset.primitive.slate,
        'gray': customPreset.primitive.gray,
        'zinc': customPreset.primitive.zinc,
        'neutral': customPreset.primitive.neutral,
        'stone': customPreset.primitive.stone,
      },
    },

  },
  plugins: [
    // Iconify plugin, requires writing list of icon sets to load
    // addIconSelectors(['mdi', 'mdi-light', 'ic']),
  ],
}
