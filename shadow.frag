#version 420
in vec4  fcolour;
out vec4 outputColor;

uniform float alpha;
void main()
{
	outputColor = fcolour;
}