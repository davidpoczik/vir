module.exports = {
    mode: 'jit',
    darkMode: 'media',

    content: [
        './app/**/*.{html,ts}',
        './src/app/**/*.{html,ts}',
        './apps/**/*.{html,ts}',
        './projects/**/*.{html,ts}'
    ],
    theme: {
        colors: {
            text: '#646464',
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
            purple: '#BC53B4',
            border: '#CFCFD1',
            inputHover: '#E9FFEC',
            inputBackground: '#F8F8F8',
            submitText: '#ffffff',
            submitDisabledText: '#CFCFD1',
            submit: '#3BAC4E',
            submitHover: '#0B8D21',
            subitDisabled: '#CFCFD1'
        },
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: []
};
