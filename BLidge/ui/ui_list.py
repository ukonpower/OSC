import bpy
from bpy.types import (UIList)

from ..utils.fcurve_manager import (get_fcurve_id, get_fcurve_prop)

def updateFCurveAccessor(self,context):
    context.scene.blidge.accessor_list.clear()
    for item in context.scene.blidge.fcurve_list:
        name = item.accessor
        if ( name in context.scene.blidge.accessor_list ) == False:
            new_item = context.scene.blidge.accessor_list.add()
            new_item.name = item.accessor

    # default animation

    table = [
        { "target": "_hide_render", "name": "hide" },
        { "target": "_scale", "name": "scale" },
        { "target": "_rotation_euler", "name": "rotation" },
        { "target": "_location", "name": "position" },
    ]

    for obj in context.scene.objects:
        blidge = obj.blidge
        animation_list = blidge.animation_list
        
        if obj.animation_data and obj.animation_data.action:
            for t in table:
                animation_list.remove( animation_list.find( t["name"] ) )
                for fcurve in obj.animation_data.action.fcurves:
                    fcurve_prop = get_fcurve_prop(get_fcurve_id(fcurve, True))
                    if( 
                        fcurve_prop != None and
                        fcurve_prop.accessor.find( t["target"] ) > -1 and
                        not (t["name"] in animation_list)
                    ):
                        item = animation_list.add()
                        item.name = t["name"]
                        item.accessor = fcurve_prop.accessor
                        item.editable = False
                        animation_list.move( len(animation_list) - 1, 0)

    bpy.ops.wm.redraw_timer(type='DRAW_WIN_SWAP', iterations=1)
                    


class BLidgeUniformListValues(bpy.types.PropertyGroup):
	name: bpy.props.StringProperty(default='name')

class BLIDGE_UL_Uniforms(UIList):

    def draw_item(self, context, layout, data, item, icon, active_data, active_propname, index):
        row = layout.row()
        row.enabled = item.editable
        row.prop(item, 'name', text="", emboss=False, icon="CUBE")
        row.prop_search(item, 'accessor', context.scene.blidge, 'accessor_list', text='', icon="FCURVE")
        ot_remove = row.operator( "blidge.object_uniform_remove", text='', icon='CANCEL', emboss=False )
        ot_remove.item_index = index

class BLIDGE_UL_Animations(UIList):

    def draw_item(self, context, layout, data, item, icon, active_data, active_propname, index):
        row = layout.row()
        row.enabled = item.editable
        row.prop(item, 'name', text="", emboss=False, icon="CUBE")
        row.prop_search(item, 'accessor', context.scene.blidge, 'accessor_list', text='', icon="FCURVE")
        ot_remove = row.operator( "blidge.object_animation_remove", text='', icon='CANCEL', emboss=False )
        ot_remove.item_index = index


    