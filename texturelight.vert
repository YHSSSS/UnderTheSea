#version 400

// Define the vertex attributes
layout(location = 0) in vec3 position;
layout(location = 1) in vec4 colour;
layout(location = 2) in vec3 normal;
layout(location = 3) in vec3 texcoord;


// Outputs to send to the fragment shader
out vec3 fnormal;
out vec3 flightdir, fposition, fdirection;
out vec4 fdiffusecolour;
out vec2 ftexcoord;

// These are the uniforms that are defined in the application
uniform mat4 model, view, projection;
uniform mat3 normalmatrix;
uniform vec4 lightpos, lightDir;

void main()
{
	vec4 position_h = vec4(position, 1.0);				// Convert the (x,y,z) position to homogeneous coords (x,y,z,w)
	vec3 light_pos3 = lightpos.xyz / lightpos.w;		// Convert light position to 3D space			
	fdiffusecolour = colour;

	// Define our vectors for calculating diffuse and specular lighting
	mat4 mv_matrix = view * model;						// Calculate the model-view transformation
	vec4 position_mv = mv_matrix * position_h;			// Modify the vertex position (x, y, z, w) by the model-view transformation
	fposition = position_mv.xyz / position_mv.w;		// Convert position to 3D space	
	fnormal = normalmatrix * normal;					// Modify the normals by the normal-matrix (i.e. to model-view (or eye) coordinates )
	flightdir = light_pos3 - fposition;					// Calculate the vector from the light position to the vertex in eye space
	ftexcoord = texcoord.xy;
	fdirection = lightDir.xyz / lightDir.w;

	// Calculate the vertex position in projectin space and output to the pipleline using the reserved variable gl_Position
	gl_Position = (projection * view * model) * position_h;
}


