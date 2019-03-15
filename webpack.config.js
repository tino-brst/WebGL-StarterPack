var HtmlWebpackPlugin = require("html-webpack-plugin")
var CleanWebpackPlugin = require("clean-webpack-plugin")
var path = require("path")

//    Entry Point  ------>  Loaders  ------>  Output
//        |                    |                |
//    [src/...]      [ts, glsl, obj, etc]   [dist/...]
//   🏞 📑 🏙 📄             🛠              📄✨

module.exports = (env = {}) => {
	return {
		// Punto de entrada
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
		// Otras configuraciones
		devtool: env.prod ?  "source-map" : "eval-source-map",
		devServer: {
			// host: "0.0.0.0",			// <- host
			contentBase: "./dist",		//   "0.0.0.0": accesible desde la red en [IP del equipo]:[Puerto] (requiere coneccion)
			stats: "minimal",			//   "localhost" (valor por defecto): no accesible desde la red, pero no requiere coneccion a internet
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

// Seleccion de loader para imagenes (segun variable de entorno env.base64)
function getImageLoader(env) {
	if (env.base64) {
		// Conversion a base64 para lidiar con las restricciones en buscadores (CORS)
		return {
			loader: "base64-image-loader"
		}
	} else {
		// Generacion estandar de archivos (cuando ya se va a correr en servidor)
		return {
			loader: "file-loader",
			options: {
				name: "[name].[ext]",
				useRelativePath: true
			}
		}
	}
}