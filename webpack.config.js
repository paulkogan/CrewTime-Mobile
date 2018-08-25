//entry --> output
const path = require('path');

const outputPath = path.join(__dirname, 'public');

module.exports = {
    entry: ["babel-polyfill","./src/ct.js"],
    mode: 'development',
    output: {
      path: path.join(__dirname, 'public'),
      filename:  "ct-mobile-bundle.js"

    },
    module : {
      rules: [{
          loader :"babel-loader",
          test: /\.js$/,
          exclude : "/node_modules/"
      },
      {
          test: /\.css$/,
          use : [
            "style-loader",
            "css-loader"
          ]
      },
      {
          test: /\.scss$/,
          use : [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
      }


    ]
  }, //better dubugging - line attribution baxck to code
    devtool: "cheap-module-eval-source-map",
    devServer: {
      contentBase:  path.join(__dirname, 'public'),
      historyApiFallback: true
    }

}; //module.exports
