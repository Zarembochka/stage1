const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = {
    entry: "./src/index.ts",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
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
                type: "asset/inline",
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts"],
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "index.js",
        assetModuleFilename: "assets/[name][ext]",
    },
    plugins: [
        new htmlWebpackPlugin({ title: "Async-race" }),
        new miniCssExtractPlugin({ filename: "[name].css" }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === "prod";
    const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");

    return merge(baseConfig, envConfig);
};