import bpy
from bpy.types import GizmoGroup

class BLidge_GGT_ObjectShape(GizmoGroup):
    bl_label = "Blidge Object Shape"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'WINDOW'
    bl_options = {'3D', 'PERSISTENT'}

    @classmethod
    def poll(cls, context):
        ob = context.object
        return (True)

    def setup(self, context):
        ob = context.object
        gz = self.gizmos.new("GIZMO_GT_cage_3d")
        gz.color = 1.0, 1.0, 1.0
        self.blidge_mesh_gizmo = gz

    def refresh(self, context):
        ob = context.object
        gz = self.blidge_mesh_gizmo
        gz.matrix_basis = ob.matrix_world.normalized()