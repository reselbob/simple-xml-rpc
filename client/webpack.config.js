module.exports = {
    mode: 'development',
    entry: './client.js',
    output: {
        path: __dirname,
        filename: 'main.js',
        libraryTarget: 'var',
        library: 'XmlRpcClient'
    }
};