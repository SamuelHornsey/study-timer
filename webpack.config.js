const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const path = require("path");

module.exports = () => {
  return {
    entry: "./src/js/index.ts",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/"
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader"
            }
          ]
        },

        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },

        {
          test: /\.(woff2?|ttf|otf|eot|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]"
              }
            }
          ]
        }
      ]
    },

    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),

      new HtmlWebpackPlugin({
        title: "Custom template",
        template: "./src/index.html"
      }),

      new CopyWebpackPlugin([
        {
          from: "src/assets"
        }
      ]),

      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,

        pngquant: {
          quality: "95-100"
        },

        plugins: [
          imageminMozjpeg({
            quality: 80,
            progressive: true
          })
        ]
      })
    ]
  };
};
