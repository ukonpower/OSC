#include <common>
#include <vert_h>

layout(location = 4) in vec2 layerIndex;

uniform int uLayers;
uniform float uLayerSpacing;

out vec2 vLayerIndex;

void main( void ) {

	#include <vert_in>

	outPos.z += layerIndex.x * uLayerSpacing;

	vLayerIndex = layerIndex;

	#include <vert_out>

}
