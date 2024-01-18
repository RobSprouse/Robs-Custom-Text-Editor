// COMMENT: imports the required modules
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

// COMMENT: defines the exports for the webpack configuration
module.exports = () => {
     return {
          mode: "production",
          entry: {
               // defines the entry points for the webpack build
               main: "./src/js/index.js",
               install: "./src/js/install.js",
          },
          output: {
               // defines the output for the webpack build
               filename: "[name].bundle.js",
               path: path.resolve(__dirname, "dist"),
          },
          plugins: [
               new HtmlWebpackPlugin({
                    // creates the index.html file
                    template: "./index.html",
                    title: "Robs Custom Text Editor",
               }),
               new InjectManifest({
                    // creates the service worker
                    swSrc: "./src-sw.js",
               }),
               new MiniCssExtractPlugin({
                    // creates the css file
                    filename: "assets/css/[name].css",
               }),
               new WebpackPwaManifest({
                    // COMMENT: creates the manifest file with the following properties, defines the icons and screenshots, and copies the favicon
                    name: "Robs Custom Text Editor",
                    inject: true, // injects the manifest link into the html
                    fingerprints: false, // creates the manifest file with/without a unique hash
                    display: "standalone", // sets the display mode for the app
                    short_name: "Robs TE", // sets the short name for the app
                    description: "A simple browser text editor.", // sets the description for the app
                    start_url: "/", // sets the start url for the app
                    publicPath: "/", // sets the public path for the app
                    icons: [
                         // sets the icons for the app
                         {
                              src: path.resolve(__dirname, "./src/images/logo.png"),
                              sizes: [96, 128, 192, 256, 384, 512],
                              destination: "assets/icons",
                         },
                    ],
                    screenshots: [
                         // sets the screenshots for the app
                         {
                              src: path.resolve(__dirname, "./src/images/JATE_wide.jpg"),
                              sizes: "640x320",
                              type: "image/jpeg",
                              form_factor: "wide",
                              label: "Main Screen",
                         },
                         {
                              src: path.resolve(__dirname, "./src/images/JATE.jpg"),
                              sizes: "320x640",
                              type: "image/jpeg",
                              form_factor: "tall",
                              label: "Main Screen",
                         },
                    ],
               }),
               new copyWebpackPlugin({
                    // copies the favicon to the dist folder
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
                    // defines the rules for the webpack build
                    {
                         test: /\.css$/i, // sets the test for the rule
                         use: [MiniCssExtractPlugin.loader, "css-loader"], // sets the loaders for the rule
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
