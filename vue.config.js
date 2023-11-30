module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/syntha/'
        : '/syntha/',
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            minimize: false,
        },
    },
    devServer: {
        proxy: 'https://syntha-backend-fef92fb3e9de.herokuapp.com/',
    }
}