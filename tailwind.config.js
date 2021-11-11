module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                'montserrat': ['Montserrat', 'Comic Sans MS', 'sans-serif'],
                'roboto': ['Roboto', 'Arial', 'sans-serif']
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
