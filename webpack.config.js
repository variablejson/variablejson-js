const path = require('path');

module.exports = {
  mode: 'production',
  entry: './variablejson.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'variablejson.js',
    library: "variablejson",
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};
