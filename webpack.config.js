const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');

module.exports = {
  mode: 'production',
  entry: {
    'bundle.js': glob
      .sync('build/static/js/*.js')
      .map(f => path.resolve(__dirname, f)),
  },
  output: {
    filename: 'social-widget.min.js',
  },
  plugins: [new UglifyJsPlugin()],
};
