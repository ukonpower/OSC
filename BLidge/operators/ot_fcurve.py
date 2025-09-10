import bpy
from bpy.types import (Operator)

from ..ui.ui_list import (updateFCurveAccessor)
from ..utils.fcurve_manager import get_fcurve_id

class BLIDGE_OT_FCurveAccessorCreate(Operator):
    bl_idname = 'blidge.fcurve_accessor_create'
    bl_label="Create Accessor"
    bl_options = {'REGISTER', 'UNDO'}
    
    fcurve_id: bpy.props.StringProperty(name="Curve ID", default="" )
    fcurve_accessor: bpy.props.StringProperty(name="Curve Accessor", default="" )
    fcurve_axis: bpy.props.StringProperty(name="Curve Axis", default="" )
        
    def execute(self, context):
        item = bpy.context.scene.blidge.fcurve_list.add()
        item.id = self.fcurve_id
        item.accessor = self.fcurve_accessor
        item.axis = self.fcurve_axis
        
        return {'FINISHED'}

class BLIDGE_OT_FCurveAccessorRename(Operator):
    bl_idname = 'blidge.fcurve_asccessor_rename'
    bl_label="Rename Accesor"
    bl_options = {'REGISTER', 'UNDO'}
    
    accessor: bpy.props.StringProperty(name="accessor", default="" )
    
    def invoke(self, context = None, event = None ):
        self.accessor = ''
        return bpy.context.window_manager.invoke_props_dialog(self)
        
    def execute(self, context):
        for fcurve in bpy.context.selected_editable_fcurves:
            fcurve_id = get_fcurve_id(fcurve, True)
            for curveData in bpy.context.scene.blidge.fcurve_list:
                if( curveData.id == fcurve_id ):
                    curveData.accessor = self.accessor

        bpy.context.area.tag_redraw()
        
        return {'FINISHED'}
    
class BLIDGE_OT_FCurveAccessorClear(Operator):
    bl_idname = 'blidge.fcurve_asccessor_clear'
    bl_label="Clear"
    bl_options = {'REGISTER', 'UNDO'}
    
    fcurve_id: bpy.props.StringProperty(name="Curve ID", default="" )
    
    def execute(self, context):
        for index, curveData in enumerate(bpy.context.scene.blidge.fcurve_list):
            if( curveData.id == self.fcurve_id ):
                bpy.context.scene.blidge.fcurve_list.remove(index)
                break

        updateFCurveAccessor(self, context)
        
        return {'FINISHED'}