var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/musette.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  },
  devtool: 'source-maps',
  plugins: [
        function() {
            this.plugin('watch-run', function(watching, callback) {
                console.log("\n\n-----------------------------------------");
                console.log('Compiled at: ' + new Date());
                console.log();
                callback();
            })
        }
    ]
};
