const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require("glob");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: "[name].[chunkhash:8].bundle.js",
    chunkFilename: "[name].[chunkhash:8].chunk.js"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/"
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", ":data-src"],
            minimize: true
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      },
      chunks: "all"
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(path.resolve(__dirname, '../src/**/*'), { nodir: true })
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].bundle.css",
      chunkFilename: "[name].[chunkhash:8].chunk.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new BrotliPlugin(),
  ]
};
