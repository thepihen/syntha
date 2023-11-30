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
}