const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        "/post-list",
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        }),
    );
};