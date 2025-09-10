
import bpy, bgl
import gpu
from math import *
from mathutils import *
from gpu_extras.batch import batch_for_shader

from .geometries.geometry_cube import GeometryCube
from .geometries.geometry_sphere import GeometrySphere
from .geometries.geometry_plane import GeometryPlane

from .shaders.shader_virtual_mesh import (fragment_shader, vertex_shader)

class BLidgeVirtualMeshRenderer:

	handler = None
	shader = None

	geo_cube = None
	geo_sphere = None

	def __init__(self) -> None:
		shaderInfo = gpu.types.GPUShaderCreateInfo()	
		shaderInfo.vertex_in(0, 'VEC3', "position")
		shaderInfo.vertex_in(1, 'VEC2', "uv")
		shaderInfo.push_constant('MAT4', "modelViewMatrix")
		shaderInfo.push_constant('MAT4', "projectionMatrix")
		shaderInfo.push_constant('FLOAT', "uColor")

		shaderInterface = gpu.types.GPUStageInterfaceInfo("shaderInterface")    
		shaderInterface.smooth('VEC3', "vColor")

		shaderInfo.vertex_out(shaderInterface)
		shaderInfo.fragment_out(0, 'VEC4', 'fragColor')

		shaderInfo.vertex_source(vertex_shader)    
		shaderInfo.fragment_source(fragment_shader)

		self.shader = gpu.shader.create_from_info(shaderInfo)

		del shaderInfo
		del shaderInterface
		
		self.geo_cube = GeometryCube()
		self.geo_sphere = GeometrySphere()
		self.geo_plane = GeometryPlane()

	def start(self, context):
		self.handler= bpy.types.SpaceView3D.draw_handler_add(self.draw, (context, ), 'WINDOW', 'POST_VIEW')

	def end(self, context):
		bpy.types.SpaceView3D.draw_handler_remove(self.handler, 'WINDOW')

	def draw(self, context):

		self.shader.bind()

		gpu.state.depth_test_set('LESS_EQUAL')
		gpu.state.depth_mask_set(True)

		view_matrix = gpu.matrix.get_model_view_matrix()
		projection_matrix = gpu.matrix.get_projection_matrix()
		
		self.shader.uniform_float("projectionMatrix", projection_matrix)

		for obj in bpy.data.objects:

			if obj.hide_viewport or obj.hide_render or obj.blidge.render_virtual_mesh == False:
				continue

			model_matrix: Matrix = obj.matrix_world.copy()
			model_view_matrix: Matrix = view_matrix @ model_matrix

			self.shader.uniform_float( "modelViewMatrix", model_view_matrix )
			self.shader.uniform_float( "uColor", 0.0 if bpy.context.space_data.shading.type == 'WIREFRAME' else 1.0  )

			geo = None

			if obj.blidge.type == 'cube':
				geo = self.geo_cube
				geo.setSize( obj.blidge.param_cube.x, obj.blidge.param_cube.y, obj.blidge.param_cube.z )
			elif obj.blidge.type == 'sphere': 
				geo = self.geo_sphere
				geo.setSize( obj.blidge.param_sphere.radius )
			elif obj.blidge.type == 'plane': 
				geo = self.geo_plane
				geo.setSize( obj.blidge.param_plane.x, obj.blidge.param_plane.z )

			if geo != None:
				if bpy.context.space_data.shading.type == 'WIREFRAME':
					batch = batch_for_shader(self.shader, 'LINES', {"position": geo.position, "uv": geo.uv }, indices=geo.index_line)
				else:
					batch = batch_for_shader(self.shader, 'TRIS', {"position": geo.position, "uv": geo.uv }, indices=geo.index)
				batch.draw(self.shader)

		gpu.state.depth_test_set('NONE')
		gpu.state.blend_set('NONE')
		