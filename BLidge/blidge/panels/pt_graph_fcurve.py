import bpy

from ..utils.fcurve_manager import get_fcurve_id
from ..operators.ot_fcurve import (BLIDGE_OT_FCurveAccessorCreate, BLIDGE_OT_FCurveAccessorRename, BLIDGE_OT_FCurveAccessorClear)

def get_fcurve_axis(fcurveId: str, axis: str):

    axisList = 'xyzw'

    if( not fcurveId.find( 'Shader NodetreeAction' ) > -1 ):
        axisList = 'xzyw'

    axisIndex = axisList.find(axis)

    if( axisIndex > -1 ):
        return 'xyzw'[axisIndex]

    return axis

class BLIDGE_PT_FCurveAccessor(bpy.types.Panel):

    bl_label = 'BLidge'
    bl_category = 'F-Curve'
    bl_space_type = 'GRAPH_EDITOR'
    bl_region_type = 'UI'

    def draw(self, context):

        layout = self.layout
        layout.label(text="Accessors")

        for fcurve in bpy.context.selected_editable_fcurves:
            fcurve_id = get_fcurve_id(fcurve, axis=True)
            box = layout.box()
            box.label(text=fcurve_id, icon='FCURVE')

            curve_data = None 
            
            for curve in bpy.context.scene.blidge.fcurve_list:
                if( curve.id == fcurve_id ):
                    curve_data = curve
                    break
            
            if curve_data:
                box.prop(curve_data, 'accessor', text='name')
                box.prop(curve_data, 'axis', text='axis', icon='EMPTY_ARROWS')
                op_delete = box.operator( BLIDGE_OT_FCurveAccessorClear.bl_idname, icon='CANCEL' )
                op_delete.fcurve_id = fcurve_id

            else:
                op_create = box.operator( BLIDGE_OT_FCurveAccessorCreate.bl_idname, icon='PLUS' )
                op_create.fcurve_id = fcurve_id
                op_create.fcurve_accessor = get_fcurve_id(fcurve)
                op_create.fcurve_axis = get_fcurve_axis( fcurve_id, 'xyzw'[fcurve.array_index] )

        if( len(bpy.context.selected_editable_fcurves) > 1 ):
            layout.label(text="Rename")
            layout.operator( BLIDGE_OT_FCurveAccessorRename.bl_idname, text='Rename All', icon="GREASEPENCIL" )
        