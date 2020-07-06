#version 400

vec4 extra_diffuse_colour = vec4(27.f/255.f, 69.f/255.f, 107.f/255.f, 0.01f);
vec4 global_ambient = vec4(0.05, 0.05, 0.05, 1.0);

in vec3 fnormal, flightdir, fposition, fdirection;
in vec4 fdiffusecolour, fambientcolour;
in vec2 ftexcoord;

uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform uint emitmode;
uniform float shininess;
uniform float attenuation_k1, attenuation_k2, attenuation_k3;

// Output pixel fragment colour
out vec4 outputColor;
void main()
{
	//texture
	vec4 textcolour1 = texture(tex1, ftexcoord);
	vec4 textcolour2 = texture(tex2, ftexcoord);
	vec4 textcolour3 = texture(tex3, ftexcoord);
	if (textcolour3.r > 0.9 && textcolour3.g > 0.9 && textcolour3.b > 0.9) discard; 

	vec4 emissive = vec4(0);			
	vec4 fambientcolour = fdiffusecolour * 0.2;
	float distancetolight = length(flightdir);

	vec3 L = normalize(flightdir);
	vec3 N = normalize(fnormal);		
	vec4 diffuse = max(dot(N, L), 0.0) * fdiffusecolour * extra_diffuse_colour;

	float attenuation = 1.0;
	attenuation = 1.0 / (attenuation_k1 + attenuation_k2*distancetolight + attenuation_k3 * pow(distancetolight, 2));

	if (emitmode == 1) emissive = vec4(1.0, 1.0, 0.8, 1.0); 

	//https://blog.csdn.net/wangdingqiaoit/article/details/51867538
	//calculate spot light
	float cutoff = 0.8f;
	float outerCutoff = 0.005f;
	float theta = dot(L, normalize(-fdirection));
	float epsilon = cutoff - outerCutoff;
	float intensity = clamp((theta - outerCutoff) / epsilon, 0.0, 1.0); 
	diffuse *= intensity;

	outputColor = (attenuation * (fambientcolour + diffuse) * textcolour1 * textcolour2 + emissive + global_ambient) ;

}