<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'

	// Grid properties
	const size = 100
	const divisions = 100
	const gridColor = 0xaaaaaa
	const centerLineColor = 0x444444

	// Create grid material
	const gridMaterial = new THREE.LineBasicMaterial({ color: gridColor, opacity: 0.5, transparent: true })
	const centerLineMaterial = new THREE.LineBasicMaterial({ color: centerLineColor })

	// Create grid geometry
	const gridGeometry = new THREE.BufferGeometry()
	const centerLineGeometry = new THREE.BufferGeometry()

	const vertices = []
	const centerLineVertices = []

	for (let i = -size / 2; i <= size / 2; i += size / divisions) {
		vertices.push(i, -size / 2, 0, i, size / 2, 0)
		vertices.push(-size / 2, i, 0, size / 2, i, 0)

		if (i === 0) {
			centerLineVertices.push(i, -size / 2, 0, i, size / 2, 0)
			centerLineVertices.push(-size / 2, i, 0, size / 2, i, 0)
		}
	}

	gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
	centerLineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(centerLineVertices, 3))
</script>

<T.Group position={[0, 0, -5]} scale={1.25}>
	<T.LineSegments geometry={gridGeometry} material={gridMaterial} />
	<T.LineSegments geometry={centerLineGeometry} material={centerLineMaterial} />
</T.Group>
