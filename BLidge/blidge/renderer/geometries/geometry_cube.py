class GeometryCube:

	size = [ None, None, None ]

	position = None
	normal = None
	index = None
	index_line = None
	uv = None

	def __init__(self, x = 1, y = 1, z = 1):

		self.setSize( x, y, z )

		self.normal = [
			[ 0, 0, 1 ],
			[ 0, 0, 1 ],
			[ 0, 0, 1 ],
			[ 0, 0, 1 ],
			[ 0, 0, - 1 ],
			[ 0, 0, - 1 ],
			[ 0, 0, - 1 ],
			[ 0, 0, - 1 ],
			[ 1, 0, 0 ],
			[ 1, 0, 0 ],
			[ 1, 0, 0 ],
			[ 1, 0, 0 ],
			[ - 1, 0, 0 ],
			[ - 1, 0, 0 ],
			[ - 1, 0, 0 ],
			[ - 1, 0, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, - 1, 0 ],
			[ 0, - 1, 0 ],
			[ 0, - 1, 0 ],
			[ 0, - 1, 0 ],
		]

		self.index = []
		self.index_line = []
		self.uv = []

		for i in range( 6 ):

			offset = 4 * i

			self.index.extend([
				[ 0 + offset, 1 + offset, 2 + offset ],
				[ 0 + offset, 2 + offset, 3 + offset ]
			])

			if i < 4:
				self.index_line.extend([
					[0 + offset, 1 + offset],
					[1 + offset, 2 + offset],
					[2 + offset, 3 + offset],
				])

			self.uv.extend([
				[ 0, 0 ],
				[ 1, 0 ],
				[ 1, 1 ],
				[ 0, 1 ],
			])

	def setSize( self, x = 1, y = 1, z = 1 ):

		if self.size[0] == x and self.size[1] == y and self.size[2] == z: return
		
		self.size[0] = x
		self.size[1] = y
		self.size[2] = z

		hx = x / 2
		hy = y / 2
		hz = z / 2

		self.position = [
			[ hx, - hy, - hz ],
			[ hx, hy, - hz ],
			[ hx, hy, hz ],
			[ hx, - hy, hz ],

			[ - hx, hy, - hz ],
			[ - hx, - hy, - hz ],
			[ - hx, - hy, hz ],
			[ - hx, hy, hz ],

			[ -hx, - hy, - hz ],
			[ hx, - hy, - hz ],
			[ hx, - hy, hz ],
			[ - hx, - hy, hz ],

			[ hx, hy, - hz ],
			[ - hx, hy, - hz ],
			[ -hx, hy, hz ],
			[ hx, hy, hz ],

		
			[ - hx, - hy, hz ],
			[ hx, - hy, hz ],
			[ hx, hy, hz ],
			[ - hx, hy, hz ],
			
			[ - hx, hy, - hz ],
			[ hx, hy, - hz ],
			[ hx, - hy, - hz ],
			[ - hx, - hy, - hz ],

		]