import "./styles/app.css"
import vertexShaderSource from "./shaders/shader.vert.glsl"
import fragmentShaderSource from "./shaders/shader.frag.glsl"

window.onload = () => {

	// Rendering context setup
	var canvas = document.getElementById("webgl") as HTMLCanvasElement
	var gl = canvas.getContext("webgl2") as WebGLRenderingContext

	// Shaders setup
	var vertexShader = gl.createShader(gl.VERTEX_SHADER)
	gl.shaderSource(vertexShader, vertexShaderSource)
	gl.compileShader(vertexShader)

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	gl.shaderSource(fragmentShader, fragmentShaderSource)
	gl.compileShader(fragmentShader)

	// Shaders program setup
	var program = gl.createProgram()
	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)
	gl.useProgram(program)

	// Triangle info (thing we are going to draw)
	const triangleVertexPositions = new Float32Array([
		-0.6, -0.6,	// coordinates xy
		0.0, 0.6,
		0.6, -0.6,
	])
	const triangleVertexColors = new Float32Array([
		1, 0, 0, // rgb values
		0, 1, 0,
		0, 0, 1,
	])
	const triangleVertexCount = 3

	// Buffers and attributes setup
	const positionsBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionsBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, triangleVertexPositions, gl.STATIC_DRAW)
	const positionLocation = gl.getAttribLocation(program, "vertexPosition")
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(positionLocation)

	const colorsBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, triangleVertexColors, gl.STATIC_DRAW)
	const colorLocation = gl.getAttribLocation(program, "vertexColor")
	gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)
	gl.enableVertexAttribArray(colorLocation)

	// Set canvas clear color
	gl.clearColor(0.05, 0.05, 0.05, 1.0)

	// Clear canvas and render scene
	gl.clear(gl.COLOR_BUFFER_BIT)
	gl.drawArrays(gl.TRIANGLES, 0, triangleVertexCount)

}