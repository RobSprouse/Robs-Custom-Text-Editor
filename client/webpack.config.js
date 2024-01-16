const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
     return {
          mode: "production",
          entry: {
               main: "./src/js/index.js",
               install: "./src/js/install.js",
          },
          output: {
               filename: "[name].bundle.js",
               path: path.resolve(__dirname, "dist"),
          },
          plugins: [
               new HtmlWebpackPlugin({
                    template: "./index.html",
                    title: "Robs Custom Text Editor",
               }),
               new InjectManifest({
                    swSrc: "./src-sw.js",
               }),
               new MiniCssExtractPlugin({
                    filename: "assets/css/[name].css",
               }),
               new WebpackPwaManifest({
                    name: "Robs Custom Text Editor",
                    inject: true,
                    fingerprints: false,
                    display: "standalone",
                    short_name: "Robs TE",
                    description: "A simple browser text editor.",
                    start_url: "/",
                    publicPath: "/",
                    icons: [
                         {
                              src: path.resolve(__dirname, "./src/images/logo.png"),
                              sizes: [96, 128, 192, 256, 384, 512],
                              destination: "assets/icons",
                         },
                    ],
               }),
               new copyWebpackPlugin({
                    patterns: [
                         {
                              from: "./favicon.ico",
                              to: "./favicon.ico",
                         },
                    ],
               }),
          ],

          module: {
               rules: [
                    {
                         test: /\.css$/i,
                         use: [MiniCssExtractPlugin.loader, "css-loader"],
                    },
                    {
                         test: /\.(png|svg|jpg|jpeg|gif)$/i,
                         type: "asset/resource",
                    },
                    {
                         test: /\.m?js$/,
                         exclude: /(node_modules|bower_components)/,
                         use: {
                              loader: "babel-loader",
                              options: {
                                   presets: ["@babel/preset-env"],
                              },
                         },
                    },
               ],
          },
     };
};
