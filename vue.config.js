module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8088',//'backend-dot-psomocnik-262113.appspot.com/',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
