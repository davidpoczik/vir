module.exports = {
  mode: 'jit',
  purge: {},
  darkMode: false,

  content: [
    './app/**/*.{html,ts}',
    './src/app/**/*.{html,ts}',
    './apps/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
