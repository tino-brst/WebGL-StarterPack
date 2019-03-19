var HtmlWebpackPlugin = require("html-webpack-plugin")
var CleanWebpackPlugin = require("clean-webpack-plugin")
var path = require("path")

// Punto de Entrada  ---->  Loaders  ------>  Salida
//        |                    |                |
//     src/...      .ts, .glsl, .obj, etc     dist/...
//   🏞 📑 🏙 📄             🛠              📄✨

module.exports = (env = {}) => {
	return {
		// Punto de Entrada
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
		// Salida
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
		// Otras configuraciones
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

// Se selecciona el loader de imagenes dependiendo de la variable de entorno env.base64
function getImageLoader(env) {
	if (env.base64) {
		// conversion a base64 para lidiar con las restricciones de los buscadores y su acceso a archivos locales (CORS)
		return {
			loader: "base64-image-loader"
		}
	} else {
		// carga de imagenes por defecto (para uso con servidor)
		return {
			loader: "file-loader",
			options: {
				name: "[name].[ext]",
				useRelativePath: true
			}
		}
	}
}