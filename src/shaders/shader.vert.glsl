#version 300 es

in vec2 vertexPosition;
in vec3 vertexColor;

out vec3 color;

void main() {
	color = vertexColor;
	gl_Position = vec4(vertexPosition, 0, 1);
}