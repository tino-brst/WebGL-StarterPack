#version 300 es

in vec4 vertexPosition;
in vec3 vertexColor;

out vec3 fragmentColor;

void main() {
	fragmentColor = vertexColor;
	gl_Position = vertexPosition;
}