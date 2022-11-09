const CompressionPlugin = require("compression-webpack-plugin");
plugins: [
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,

    filename: "[path][query]",

    algorithm: "gzip",

    deleteOriginalAssets: false,
  }),
];
