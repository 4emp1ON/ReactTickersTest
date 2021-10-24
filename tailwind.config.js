module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            minWidth: {
                '20': '20vw',
            },
            keyframes: {
                slideIn: {
                    '0%': { opacity: 0, transform: 'translateX(100%)' },
                    '100%': { opacity: 1, transform: 'translateX(0)' }
                }
            },
            animation: {
                'slide-in': 'slideIn 0.3s linear both',
            },
            translate: {
                'half': "-50%"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
