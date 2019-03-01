/**
 * Additional webpack config for compilation of the DLL, main and renderer process bundles
 */

const path = require("path");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";
// tslint:disable-next-line:no-console
console.log(`Building for ${isProduction ? "production" : "development"}.`);

module.exports = {
  devtool: isProduction ? undefined : "source-map",
  mode: isProduction ? "production" : "development",

  resolve: {
    extensions: ["*", ".ts", ".tsx", ".mjs", ".js", ".json"],
    mainFields: ["browser", "main", "module"],
  },

  devServer: {
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: / \.mjs$ /,
        type: "javascript/esm",
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development"),
    }),
  ],
};
