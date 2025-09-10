import bpy;
from bpy.app.handlers import persistent

from ..operators.ot_export import BLIDGE_OT_GLTFExport

@persistent
def on_load(scene = None, context = None):
	pass

@persistent
def on_save(scene = None, context = None):
	BLIDGE_OT_GLTFExport.on_save()

@persistent
def on_depsgraph_update(scene = None, context = None):
	pass

def register_event():
	bpy.app.handlers.load_post.append(on_load)
	bpy.app.handlers.save_post.append(on_save)
	bpy.app.handlers.depsgraph_update_post.append(on_depsgraph_update)

def unregister_event():
	try:
		bpy.app.handlers.load_post.remove(on_load)
		bpy.app.handlers.save_post.remove(on_save)
		bpy.app.handlers.depsgraph_update_post.remove(on_depsgraph_update)
	except ValueError:
		pass
