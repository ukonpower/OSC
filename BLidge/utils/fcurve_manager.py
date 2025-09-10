import bpy;
import re;

def get_fcurve_id(fcurve: bpy.types.FCurve, axis: bool = False):
	result = ""

	actionName = re.search(r'(?<=\(\").*?(?=\"\))', str(fcurve.id_data))
	if actionName:
		result = actionName.group() + '_' + fcurve.data_path
	else:
		result = "unknown" + "_" + fcurve.data_path

	if axis:
		result += '_' + 'xyzw'[fcurve.array_index]
		
	return  result

def get_fcurve_prop( id: str ):
	for fcurve_property in bpy.context.scene.blidge.fcurve_list:
		if fcurve_property.id == id:
			return fcurve_property

	return None