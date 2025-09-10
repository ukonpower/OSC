import os
import bpy

def get_gltf_presets():
    items = []

    preset_path_list = bpy.utils.preset_paths('operator/export_scene.gltf/')

    if(len(preset_path_list) <= 0):
        return []
    
    preset_path = preset_path_list[0]
    file_list = os.listdir(preset_path)
    
    for file in file_list:
        if file.find( '.py' ) > -1:
            items.append(( os.path.join(preset_path, file), file.replace('.py', ''), file))

    return items