import bpy
from bpy.types import (Operator)

class BLIDGE_PT_ObjectPropertie(bpy.types.Panel):

    bl_label = 'BLidge'
    bl_space_type = 'PROPERTIES'
    bl_region_type = 'WINDOW'
    bl_context = 'object'

    def draw(self, context):
        object = context.object
        layout = self.layout

        object_type = object.blidge.type

        # name

        layout.prop( object.blidge, 'blidgeClass', text="class" )

        # type

        if object.type == 'CAMERA':
            layout.label( text='Type: Camera' )
        elif object.type == 'LIGHT':
            layout.label( text='Type: Light' )
            column = layout.column(align=True)
            column.prop( object.blidge.param_light, 'shadowMap' )
        else:
            layout.prop( object.blidge, 'type', text='Type' )

        if( object_type == 'cube' ):
            box_geometry = layout.box()
            box_geometry.label(text="Cube Geometry", icon='MESH_DATA')
            column = box_geometry.column(align=True)
            column.prop( object.blidge.param_cube, 'x' )
            column.prop( object.blidge.param_cube, 'y' )
            column.prop( object.blidge.param_cube, 'z' )

        if( object_type == 'sphere' ):
            box_geometry = layout.box()
            box_geometry.label(text="Sphere Geometry", icon='MESH_DATA')
            column = box_geometry.column(align=True)
            column.prop( object.blidge.param_sphere, 'radius' )

        if( object_type == 'plane' ):
            box_geometry = layout.box()
            box_geometry.label(text="Plane Geometry", icon='MESH_DATA')
            column = box_geometry.column(align=True)
            column.prop( object.blidge.param_plane, 'x' )
            column.prop( object.blidge.param_plane, 'z' )

        # render

        layout.prop( object.blidge, "render_virtual_mesh", text="Render virtual mesh" )

        # material

        box_material = layout.box()
        box_material.label(text="Material", icon='MATERIAL')
        box_material.prop( object.blidge.material, 'name', text="Name" )

        scene = bpy.context.scene

        box_material.label(text="Uniforms", icon='MESH_CUBE')
        box_material.template_list("BLIDGE_UL_Uniforms", "The_List", object.blidge.material, "uniform_list", scene.blidge, "object_uniform_list_index")

        uniform_controls = box_material.row()
        uniform_controls.operator( "blidge.object_uniform_create", text='Create', icon="PLUS" )

        box_animation = layout.box()
        box_animation.label(text="Animations", icon='GRAPH')
        box_animation.template_list("BLIDGE_UL_Animations", "The_List", object.blidge, "animation_list", scene.blidge, "object_animation_list_index")
        animation_controls = box_animation.row()
        animation_controls.operator( "blidge.object_animation_create", text='Create', icon="PLUS" )