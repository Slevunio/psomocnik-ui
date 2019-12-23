module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'backend-dot-psomocnik-262113.appspot.com/',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
