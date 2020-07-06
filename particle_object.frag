// Adaped from the particle animation tutorial from:
// http://www.opengl-tutorial.org/intermediate-tutorials/billboards-particles/particles-instancing/

#version 400 

// Interpolated values from the vertex shaders
in vec2 UV;
in vec4 particlecolor;

// Ouput data
out vec4 color;

uniform sampler2D myTextureSampler;

void main(){
	// Output color = color of the texture at the specified UV
	vec4 tc = texture2D( myTextureSampler, UV );
	if (tc.r > 0.9 && tc.g > 0.9 && tc.b > 0.9) discard; 
	color = texture2D( myTextureSampler, UV ) * particlecolor;

}