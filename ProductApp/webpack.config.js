const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    crossOriginLoading : 'anonymous',
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    port: 9001,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpeg|gif|jpg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.webp$/i,
        use: ["file-loader", "webp-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "productapp",
      filename: "remoteEntry.js",
      remotes: {
        homepage: "home@http://localhost:3000/remoteEntry.js",
        detailspage: "details@http://localhost:3001/remoteEntry.js",
        seatselection: "seatselection@http://localhost:3003/remoteEntry.js",
        enterdata : "enterdata@http://localhost:3005/remoteEntry.js",
        viewdata : "viewdata@http://localhost:3008/remoteEntry.js"
      },
      exposes:{
        "./ProductData": "./src/productObservable.js"
      },
      shared: ["react:'^17.0.2'", "react-dom:'^17.0.2'", "@mui/material:'^5.15.10'"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
