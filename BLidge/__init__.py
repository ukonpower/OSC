bl_info = {
    "name" : "blidge",
    "author" : "ukonpower",
    "description" : "",
    "blender" : (4, 2, 0),
    "version" : (1, 0, 0),
    "location" : "",
    "warning" : "",
    "category" : "Testing"
}


import os

if "bpy" in locals():
    import imp
    imp.reload(BLidgeProperties)
    imp.reload(BLIDGE_OT_install_dependencies, BLIDGE_PT_install_dependencies)
    imp.reload(BLIDGE_OT_GLTFExport, BLIDGE_OT_SceneExport)
    imp.reload(BLIDGE_OT_Sync)
    imp.reload(BLIDGE_OT_ObjectUniformCreate, BLIDGE_OT_ObjectUniformRemove, BLIDGE_OT_ObjectAnimationCreate, BLIDGE_OT_ObjectAnimationRemove)
    imp.reload(BLIDGE_OT_FCurveAccessorCreate, BLIDGE_OT_FCurveAccessorRename, BLIDGE_OT_FCurveAccessorClear)
    imp.reload(BLIDGE_PT_Controls)
    imp.reload(BLIDGE_PT_ObjectPropertie)
    imp.reload(BLIDGE_PT_FCurveAccessor)
    imp.reload(BLIDGE_UL_Uniforms, BLIDGE_UL_Animations, BLidgeUniformListValues)
    imp.reload(BLidgeVirtualMeshRenderer)
else:
    
    import bpy

    class Globals:
        path = bpy.path.abspath(os.path.dirname(os.path.realpath(__file__) ))
        libpath =  bpy.path.abspath(path + "/lib/")
        
    from .globals.properties import (BLidgeProperties)
    from .globals.preference import (BLIDGE_OT_install_dependencies, BLIDGE_PT_install_dependencies)
    from .operators.ot_export import (BLIDGE_OT_GLTFExport, BLIDGE_OT_SceneExport)
    from .operators.ot_sync import (BLIDGE_OT_Sync)
    from .operators.ot_fcurve import (BLIDGE_OT_FCurveAccessorCreate, BLIDGE_OT_FCurveAccessorRename, BLIDGE_OT_FCurveAccessorClear)
    from .operators.ot_object import (BLIDGE_OT_ObjectUniformCreate, BLIDGE_OT_ObjectUniformRemove, BLIDGE_OT_ObjectAnimationCreate, BLIDGE_OT_ObjectAnimationRemove)
    from .panels.pt_view_controls import (BLIDGE_PT_Controls)
    from .panels.pt_prop_object import (BLIDGE_PT_ObjectPropertie)
    from .panels.pt_graph_fcurve import (BLIDGE_PT_FCurveAccessor)
    from .ui.ui_list import (BLIDGE_UL_Uniforms, BLIDGE_UL_Animations, BLidgeUniformListValues)
    from .renderer.renderer_virtual_mesh import (BLidgeVirtualMeshRenderer)
    from .globals.events import (register_event, unregister_event)

classes = [
    BLIDGE_OT_GLTFExport,
    BLIDGE_OT_SceneExport,
    BLIDGE_OT_Sync,
    BLIDGE_OT_install_dependencies,
    BLIDGE_OT_FCurveAccessorCreate,
    BLIDGE_OT_FCurveAccessorRename,
    BLIDGE_OT_FCurveAccessorClear,
    BLIDGE_OT_ObjectUniformCreate,
    BLIDGE_OT_ObjectUniformRemove,
    BLIDGE_OT_ObjectAnimationCreate,
    BLIDGE_OT_ObjectAnimationRemove,
    BLIDGE_PT_Controls,
    BLIDGE_PT_install_dependencies,
    BLIDGE_PT_ObjectPropertie,
    BLIDGE_PT_FCurveAccessor,
    BLIDGE_UL_Animations,
    BLIDGE_UL_Uniforms,
    BLidgeUniformListValues
]

virtualmesh_renderer = BLidgeVirtualMeshRenderer()

def register():
    BLidgeProperties.register()

    for c in classes:
        bpy.utils.register_class(c)

    # renderer
    virtualmesh_renderer.start(bpy.context)

    # event
    register_event()

def unregister():
    BLidgeProperties.unregister()
    
    for c in classes:
        bpy.utils.unregister_class(c)

    # renderer
    virtualmesh_renderer.end(bpy.context)

    #event
    unregister_event()

