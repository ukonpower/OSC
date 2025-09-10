import bpy
from .fcurve_manager import get_fcurve_id


class AnimationParser:
    def parse_vector(self, vector):
        parsed_vector = {}
        if hasattr(vector, "x"):
            parsed_vector["x"] = vector.x
        if hasattr(vector, "y"):
            parsed_vector["y"] = vector.y
        if hasattr(vector, "z"):
            parsed_vector["z"] = vector.z
        if hasattr(vector, "w"):
            parsed_vector["w"] = vector.w
        return parsed_vector

    def parse_keyframe(self, keyframe: bpy.types.Keyframe, before_keyframe: bpy.types.Keyframe):
        c = self.parse_vector(keyframe.co)
        interpolation = keyframe.interpolation[0]
        parsed_keyframe = [
            interpolation,
            [c["x"], c["y"]],
        ]
        if interpolation == 'B' or (before_keyframe is not None and before_keyframe.interpolation[0] == 'B'):
            h_l = self.parse_vector(keyframe.handle_left)
            parsed_keyframe[1].extend([
                h_l["x"], h_l["y"]
            ])
        if interpolation == 'B':
            h_r = self.parse_vector(keyframe.handle_right)
            parsed_keyframe[1].extend([
                h_r["x"], h_r["y"]
            ])
        return parsed_keyframe

    def parse_keyframe_list(self, keyframes: list[bpy.types.Keyframe], invert: bool):
        parsed_keyframes = []
        for i, keyframe in enumerate(keyframes):
            if i > 0:
                prev_keyframe = keyframes[i - 1]
                parsed_keyframe = self.parse_keyframe(keyframe, prev_keyframe)
            else:
                parsed_keyframe = self.parse_keyframe(keyframe, None)
            if invert:
                parsed_keyframe[1][1] *= -1
                if len(parsed_keyframe[1]) > 2:
                    parsed_keyframe[1][3] *= -1
                if len(parsed_keyframe[1]) > 4:
                    parsed_keyframe[1][5] *= -1
            parsed_keyframes.append(parsed_keyframe)
        return parsed_keyframes

    def parse_fcurve(self, fcurve: bpy.types.FCurve):
        parsed_fcurve = {
            "axis": "x",
            "k": None
        }
        fcurve_id = get_fcurve_id(fcurve, True)
        invert = fcurve_id.find('location_y') > -1 or fcurve_id.find('rotation_euler_y') > -1
        parsed_fcurve['k'] = self.parse_keyframe_list(fcurve.keyframe_points, invert)
        for fcurve_prop in bpy.context.scene.blidge.fcurve_list:
            if fcurve_prop.id == fcurve_id:
                parsed_fcurve['axis'] = fcurve_prop.axis
                break
        return parsed_fcurve

    def get_animation_list(self):
        animation_list = []
        animation_dict = {}
        dict_counter = 0

        def get_fcurve_prop(fcurve):
            fcurve_axis_id = get_fcurve_id(fcurve, True)
            for fcurve_prop in bpy.context.scene.blidge.fcurve_list:
                if fcurve_prop.id == fcurve_axis_id:
                    return fcurve_prop
            return None

        for action in bpy.data.actions:
            for fcurve in action.fcurves:
                fcurve_prop = get_fcurve_prop(fcurve)
                if fcurve_prop is not None:
                    accessor_id = fcurve_prop.accessor
                    if accessor_id not in animation_dict:
                        animation_dict[accessor_id] = dict_counter
                        animation_list.append([])
                        dict_counter += 1
                    animation_list[animation_dict[accessor_id]].append(self.parse_fcurve(fcurve))
        return {"list": animation_list, "dict": animation_dict}
