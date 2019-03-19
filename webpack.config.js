var HtmlWebpackPlugin = require("html-webpack-plugin")
var CleanWebpackPlugin = require("clean-webpack-plugin")
var path = require("path")

//    Entry Point  ------>  Loaders  ------>  Output
//        |                    |                |
//     src/...      .ts, .glsl, .obj, etc     dist/...
//   🏞 📑 🏙 📄             🛠              📄✨

module.exports = (env = {}) => {
	return {
		// Entry Point
		entry: "./src/index.ts",
		// Loaders
		module: {
			rules: [
				{
					test: /\.glsl$/,
					use: "webpack-glsl-loader"
				},
				{
					test: /\.obj$/,
					use: "webpack-obj-loader"
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader" ]
				},
				{
					test: /\.(png|jpe?g)$/,
					use: getImageLoader(env)
				}
			]
		},
		// Output
		output: {
			filename: "app.js",
			path: path.resolve(__dirname, "dist")
		},
		// Plugins
		plugins: [
			new CleanWebpackPlugin(["dist"]),
			new HtmlWebpackPlugin({
				template: "src/index.html"
			})
		],
		// Other Settings
		devtool: env.prod ?  "source-map" : "eval-source-map",
		devServer: {
			host: "localhost",
			contentBase: "./dist",
			stats: "minimal",
			overlay: false
		},
		stats: {
			all: false,
			assets: true,
			colors: true,
			errors: true,
			errorDetails: true,
		}
	}
}

// Select image loader depending on environment variable env.base64
function getImageLoader(env) {
	if (env.base64) {
		// base64 conversion to deal with browser restrictions (CORS)
		return {
			loader: "base64-image-loader"
		}
	} else {
		// default image loading (intended for server use)
		return {
			loader: "file-loader",
			options: {
				name: "[name].[ext]",
				useRelativePath: true
			}
		}
	}
}