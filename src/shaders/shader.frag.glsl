#version 300 es
precision mediump float;

in vec3 fragmentColor;

out vec4 outColor;

void main() {
	outColor = vec4(fragmentColor, 1.0);
}