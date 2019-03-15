import "./styles/app.css"
import vertexShaderSource from "./shaders/shader.vert.glsl"
import fragmentShaderSource from "./shaders/shader.frag.glsl"

window.onload = () => {

	var canvas = document.getElementById("webgl") as HTMLCanvasElement
	var gl = canvas.getContext("webgl") as WebGLRenderingContext

	// Setup de Shaders y Programa
	var vertexShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertexShader, vertexShaderSource)
	gl.compileShader(vertexShader)

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragmentShader, fragmentShaderSource)
	gl.compileShader(fragmentShader)

	var program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	gl.useProgram(program)

	// Info del Triangulo
	var model = {
		vertices: new Float32Array([
		//    x     y
			-0.6, -0.6,
			0.0, 0.6,
			0.6, -0.6,
		]),
		colors: new Float32Array([
		//  r  g  b
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
		])
	}

	// Setup de Buffers y Atributos
	var positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, model.vertices, gl.STATIC_DRAW)
	var positionLocation = gl.getAttribLocation(program, "a_Position")
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(positionLocation)

	var colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, model.colors, gl.STATIC_DRAW)
	var colorLocation = gl.getAttribLocation(program, "a_Color")
	gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(colorLocation)

	// Renderizo escena
	gl.clearColor(0.05, 0.05, 0.05, 1.0)
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.TRIANGLES, 0, 3)

}