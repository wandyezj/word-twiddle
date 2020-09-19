const devCerts = require("office-addin-dev-certs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    node: { global: true, fs: 'empty' }, // some packages have node dependencies even if they are not used )
    devtool: "source-map",
    entry: {
      polyfill: "@babel/polyfill",
      taskpane: "./src/taskpane.ts",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".html", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader"
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader"
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: "file-loader"
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane.html",
        chunks: ["polyfill", "taskpane"]
      }),
      new CopyWebpackPlugin({patterns:[
        {
          to: "taskpane.css",
          from: "./src/taskpane.css"
        },
        {
          to:"manifest.xml",
          from: "./manifest.xml"
        },
        {
          to:"index.html",
          from:"./index.html"
        },
        {
          to:"assets/icon-16.png",
          from:"assets/icon-16.png"
        },
        {
          to:"assets/icon-32.png",
          from:"assets/icon-32.png"
        },
        {
          to:"assets/icon-80.png",
          from:"assets/icon-80.png"
        },
        {
          to:"assets/icon-128.png",
          from:"assets/icon-128.png"
        },
        {
          to:"assets/icon-300.png",
          from:"assets/icon-300.png"
        },
        {
          to:"assets/icon-80.png",
          from:"assets/icon-80.png"
        },
        {
          to:"assets/icon-128.png",
          from:"assets/icon-128.png"
        },
        {
          to:"assets/icon-300.png",
          from:"assets/icon-300.png"
        },
        {
          to:"statements/eula.html",
          from:"statements/generated/eula.html"
        },
        {
          to:"statements/privacy.html",
          from:"statements/generated/privacy.html"
        },
        {
          to:"statements/support.html",
          from:"statements/generated/support.html"
        },
      ]})
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },      
      https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  };

  return config;
};
