/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/**/*.{html,js,svelte,ts}',
      './node_modules/flowbite/**/*.js'

  ],
  theme: {
    fontFamily: {
      'sans': ['-apple-system', 'BlinkMacSystemFont', "Inter", 'Helvetica Neue', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      'mono': ['SFMono-Regular', 'JetBrains Mono',],
    },
    extend: {}
  },
  plugins: [
    require('flowbite/plugin')
  ]
};


