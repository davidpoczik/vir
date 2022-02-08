module.exports = {
  mode: 'jit',
  darkMode: 'media',

  content: [
    './app/**/*.{html,ts}',
    './src/app/**/*.{html,ts}',
    './apps/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
  ],
  theme: {
    colors: {
      sidebarText: '#8A8A8A',
      gray: '#edf1f5',
      white: '#ffffff',
      brown: '#2b2b2b',
      red: '#f86c6b',
      cyan: '#01c0c8',
      green: '#00c292',
      blue: '#03a9f3',
      orange: '#fb9678',
      black: '#000000',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
