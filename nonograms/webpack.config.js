const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        clean: true,
        assetModuleFilename: "assets/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(mp3|wav)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/sounds/[name][ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(scss|css)$/i,
                use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({ title: "Nonograms", favicon: "./src/assets/images/favicon.svg" }),
        new miniCssExtractPlugin({ filename: "[name].css" }),
    ],
};
