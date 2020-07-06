#version 420 core
layout(location = 0) in vec3 position;

out vec4 fcolour;		// Output from vertex shader

out vec2 ftexcoord;
uniform mat4 model, view, projection;		// Model transformation matrix
uniform float alpha;
void main()
{
	vec4 position_h = vec4(position, 1.0);
	fcolour = vec4(0, 0, 0, 0.5);		
	gl_Position = projection * view * model * position_h;
}