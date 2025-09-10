import bpy

from ..utils.gltf import get_gltf_presets
from ..ui.ui_list import (updateFCurveAccessor)

class BLidgeNameProperty(bpy.types.PropertyGroup):
	name: bpy.props.StringProperty(default='')

class BLidgeFCurveProperty(bpy.types.PropertyGroup):
	index: bpy.props.IntProperty(default=0)
	id: bpy.props.StringProperty(default='')
	accessor: bpy.props.StringProperty(default='',update=updateFCurveAccessor)
	axis: bpy.props.EnumProperty(
		name="axis",
        description="value axis",
        items=[
			( "x", "X", "" ),
			( "y", "Y", "" ),
			( "z", "Z", "" ),
			( "w", "W", "" ),
		],
		default='x'
	)

class BLidgeControlsProperty(bpy.types.PropertyGroup):
    sync_host: bpy.props.StringProperty(name="host", default="localhost")
    sync_port: bpy.props.IntProperty(name="port", default=3100)
    export_gltf_path: bpy.props.StringProperty(name="path", default="./", subtype='FILE_PATH' )
    export_gltf_preset_list: bpy.props.EnumProperty(
        name="preset",
        description="gltf export preset",
        items=get_gltf_presets(),
    )
    export_gltf_export_on_save: bpy.props.BoolProperty(name="export on save", default=False)
    export_scene_data_path: bpy.props.StringProperty(name="path", default="./", subtype='FILE_PATH')
    fcurve_list: bpy.props.CollectionProperty(type=BLidgeFCurveProperty, name="fcurve")
    accessor_list: bpy.props.CollectionProperty(type=BLidgeFCurveProperty, name="fcurve")
    object_uniform_list_index: bpy.props.IntProperty(name = "object uniform list index", default = 0)
    object_animation_list_index: bpy.props.IntProperty(name = "object uniform list index", default = 0)

class BLidgeGeometryCubeProperty(bpy.types.PropertyGroup):
    x: bpy.props.FloatProperty(default=2)
    y: bpy.props.FloatProperty(default=2)
    z: bpy.props.FloatProperty(default=2)

class BLidgeGeometryPlaneProperty(bpy.types.PropertyGroup):
    x: bpy.props.FloatProperty(default=2)
    z: bpy.props.FloatProperty(default=2)

class BLidgeGeometrySphereProperty(bpy.types.PropertyGroup):
    radius: bpy.props.FloatProperty(default=1)

class BLidgeLightProperty(bpy.types.PropertyGroup):
    shadowMap: bpy.props.BoolProperty(default=False)

class BLidgeAnimationProperty(bpy.types.PropertyGroup):
    name: bpy.props.StringProperty(default='')
    accessor: bpy.props.StringProperty(default='')
    editable: bpy.props.BoolProperty(default=True)

class BLidgeMaterialProperty(bpy.types.PropertyGroup):
    name: bpy.props.StringProperty(default='')
    uniform_list: bpy.props.CollectionProperty(type=BLidgeAnimationProperty)

class BLidgeObjectProperty(bpy.types.PropertyGroup):
    blidgeClass: bpy.props.StringProperty(description="blidge object name", default="")
    type: bpy.props.EnumProperty(
		name="type",
        description="object type",
        items=[
			( "empty", "Empty", "" ),
			( "cube", "Cube", "" ),
			( "plane", "Plane", "" ),
			( "sphere", "Sphere", "" ),
			( "mesh", "Mesh", "" ),
			( "camera", "Camera", "" ),
			( "light", "Light", "" ),
			( "cylinder", "Cylinder", "" ),
			( "gltf", "glTF", "" ),
		],
		default='empty',
	)
    param_cube: bpy.props.PointerProperty( type=BLidgeGeometryCubeProperty)
    param_plane: bpy.props.PointerProperty( type=BLidgeGeometryPlaneProperty)
    param_sphere: bpy.props.PointerProperty( type=BLidgeGeometrySphereProperty)
    param_light: bpy.props.PointerProperty( type=BLidgeLightProperty)
    material: bpy.props.PointerProperty( type=BLidgeMaterialProperty)
    animation_list: bpy.props.CollectionProperty(type=BLidgeAnimationProperty)
    render_virtual_mesh: bpy.props.BoolProperty(default=False)

classes = [
    BLidgeGeometryCubeProperty,
    BLidgeGeometryPlaneProperty,
    BLidgeGeometrySphereProperty,
    BLidgeLightProperty,
    BLidgeFCurveProperty,
    BLidgeControlsProperty,
    BLidgeAnimationProperty,
    BLidgeMaterialProperty,
    BLidgeObjectProperty,
]

class BLidgeProperties():
    def register():
        for c in classes:
            bpy.utils.register_class(c)

        bpy.types.Scene.blidge = bpy.props.PointerProperty(type=BLidgeControlsProperty)
        bpy.types.Object.blidge = bpy.props.PointerProperty(type=BLidgeObjectProperty)

    def unregister():
        for c in classes:
            bpy.utils.unregister_class(c)

        del bpy.types.Scene.blidge
        del bpy.types.Object.blidge