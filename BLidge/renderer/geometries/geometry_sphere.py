import math
import mathutils

class GeometrySphere:

	radius = None
	width_segments = None
	height_segments = None

	position = []
	normal = []
	uv = []
	index = []
	index_line = []

	def __init__(self, radius = 0.5, width_segments = 30, height_segments = 20 ):

		self.width_segments = width_segments
		self.height_segments = height_segments

		self.setSize( radius )

		for i in range( self.height_segments + 1 ):

			thetaI = i / self.height_segments * math.pi

			segments = width_segments if ( i != 0 and i != self.height_segments ) else width_segments

			for j in range( segments ):

				thetaJ = j / segments * math.pi * 2.0
				widthRadius = math.sin( thetaI ) * radius

				x = math.cos( thetaJ ) * widthRadius
				y = math.sin( thetaJ ) * widthRadius
				z = - math.cos( thetaI ) * radius

				self.uv.append([
					j / segments,
					i / self.height_segments,
				])

				normal = mathutils.Vector([ x, y, z ])
				normal.normalize()
				self.normal.append([ normal.x, normal.y, normal.z ])

				offset = i * segments + j

				if i < self.height_segments:
					self.index_line.extend([
						[ offset + 0,  i * segments + (j + 1) % segments ],
						[ offset + 0, offset + segments ],
					])

				self.index.extend([
					[
						i * self.width_segments + j,
						( i + 1 ) * self.width_segments + ( j + 1 ) % self.width_segments,
						i * self.width_segments + ( j + 1 ) % self.width_segments,
					],
					[
						i * self.width_segments + j,
						( i + 1 ) * self.width_segments + j,
						( i + 1 ) * self.width_segments + ( j + 1 ) % self.width_segments,
					]
				])
		
	def setSize( self, radius ):
		if self.radius == radius:
			return

		self.radius = radius
		self.position = []

		for i in range( self.height_segments + 1 ):

			thetaI = i / self.height_segments * math.pi

			segments = self.width_segments if ( i != 0 and i != self.height_segments ) else self.width_segments

			for j in range( segments ):

				thetaJ = j / segments * math.pi * 2.0
				widthRadius = math.sin( thetaI ) * radius

				x = math.cos( thetaJ ) * widthRadius
				y = math.sin( thetaJ ) * widthRadius
				z = - math.cos( thetaI ) * radius

				self.position.append([ x, y, z ])
		