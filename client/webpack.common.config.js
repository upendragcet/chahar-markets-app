/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects":
"only-multiline"} ] */

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  entry: glob.sync('./app/bundles/packs/*.js*').reduce(
    (map, entry) => {
      const basename = entry.split('/').pop().split('.js')[0]
      map[basename] = path.resolve(entry)
      return map
    }, { vendor: ['bootstrap-loader', 'font-awesome-loader'] }
  ),

  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, '../app/assets/webpack'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: ['imports-loader?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham'],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: ["url-loader"]
      },
      {
        test: /\.(ttf|eot|svg|gif)(\?[\s\S]+)?$/,
        use: ['file-loader']
      },
      { test: /bootstrap-sass\/assets\/javascripts\//, use: ['imports-loader?jQuery=jquery'] },
      { test: /jquery\.js$/, use: ['expose-loader?jQuery'] },
      { test: /jquery\.js$/, use: ['expose-loader?$'] },
      { test: require.resolve('react'), use: ['expose-loader?React'] },
      { test: require.resolve('react-dom'), use: ['expose-loader?ReactDOM'] },
    ],
  },
  optimization: {
    splitChunks: { // CommonsChunkPlugin()
      name: 'vendor',
      filename: "vendor_bundle.js",
      // (the filename of the commons chunk)
      minChunks: 3
    }
  }
};

module.exports = config;
config.watchOptions = {
  poll: 4000
}

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
