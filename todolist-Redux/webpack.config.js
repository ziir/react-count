module.exports = {
  entry: './app.js',
  output: {
    filename: './bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
    {
      test: /.js$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    },
    {
      test: /\.scss$/,
      loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
    }
    ]
  },
  sassLoader: {
        includePaths: [ './' ]
  }
};
