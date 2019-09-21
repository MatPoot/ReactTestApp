const path = require("path");

module.exports = {
  mode: "production",
  entry: "./js/dist/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "prod/js")
  }
};
