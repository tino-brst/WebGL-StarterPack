import "./styles/app.css"
import vertexShaderSource from "./shaders/shader.vert.glsl"
import fragmentShaderSource from "./shaders/shader.frag.glsl"

main()

function main() {

    // Encontramos el canvas y obtenemos el contexto de WebGL
    const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement
    const gl = canvas.getContext("webgl2")

    // Creamos shaders de vertices y de fragmentos
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    // Creamos el programa de shaders
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    // Obtenemos ubicacion de atributos/uniforms del programa
    const vertexPositionLocation = gl.getAttribLocation(program, "vertexPosition")
    const vertexColorLocation = gl.getAttribLocation(program, "vertexColor")

    // Info del triangulo que vamos a dibujar (posiciones y colores de los vertices)
    const triangleVertexPositions = new Float32Array([
        // posiciones en coordenadas X, Y
        -0.5, -0.5,
        0.0, 0.5,
        0.5, -0.5,
    ])
    const triangleVertexColors = new Float32Array([
        // colores en R, G, B
        1, 0, 0, // rojo
        0, 1, 0, // verde
        0, 0, 1, // azul
    ])
    const triangleVertexCount = 3

    // Cargamos info del triangulo en buffers (VBOs)
    const vertexPositionsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertexPositions, gl.STATIC_DRAW)

    const vertexColorsBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertexColors, gl.STATIC_DRAW)

    // Encapsulamos info de buffers (posiciones y colores) en un "contenedor" (VAO)
    const triangleVertexInfo = gl.createVertexArray()
    gl.bindVertexArray(triangleVertexInfo) // a partir de este metodo, toda llamada a bindBuffer y vertexAttribPointer queda "grabada" en nuestro triangleVertexInfo
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionsBuffer)
    gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0) // el atributo vertexPosition obtendra sus valores del vertexPositionsBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorsBuffer)
    gl.vertexAttribPointer(vertexColorLocation, 3, gl.FLOAT, false, 0, 0) // el atributo vertexColor obtendra sus valores del vertexColorsBuffer

    // Habilitamos cada uno de los atributos del VAO
    gl.enableVertexAttribArray(vertexPositionLocation)
    gl.enableVertexAttribArray(vertexColorLocation)

    // Limpiamos el canvas
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Establecemos el programa que vamos a usar para dibujar el triangulo
    gl.useProgram(program)

    // Enlazamos nuestro "contenedor" con toda la info del triangulo
    gl.bindVertexArray(triangleVertexInfo)

    // Y lo dibujamos (finalmente!)
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexCount)

}