import bpy
from bpy.types import AddonPreferences
import sys
import subprocess
import os

from pathlib import Path
from .. import Globals

class BLIDGE_OT_install_dependencies(bpy.types.Operator):
	bl_idname = "blidge.install_dependencies"
	bl_label = "Install Dependencies"
	bl_description = "Install dependencies"
	bl_options = {'REGISTER', 'INTERNAL'}

	def execute(self, context):

		python_path = str(sys.executable)
		python_path = bpy.path.abspath(sys.executable)
		subprocess.call([python_path, '-m', 'pip', 'install', '--upgrade', "websocket-server", '--target', Globals.libpath, '--no-cache'])
		
		return {'FINISHED'}
	
class BLIDGE_PT_install_dependencies(AddonPreferences):
	bl_idname = 'blidge'

	def draw(self, context):
		layout = self.layout
		row = layout.row()
		row.operator("blidge.install_dependencies")