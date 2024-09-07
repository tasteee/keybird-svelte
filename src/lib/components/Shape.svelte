<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import * as THREE from 'three'
	import { spring } from 'svelte/motion'

	type MeshT = THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
	let mesh: MeshT

	const baseGeometry = new THREE.BoxGeometry(1, 1, 1, 8, 8, 8)
	const targetGeometry = new THREE.SphereGeometry(0.8, 32, 32)
	const floatLength = baseGeometry.attributes.position.array.length
	const floatArray = new Float32Array(floatLength)

	targetGeometry.setAttribute('position', new THREE.BufferAttribute(floatArray, 3))
	baseGeometry.morphAttributes.position = [targetGeometry.attributes.position]
	const morphOptions = { stiffness: 0.1, damping: 0.4 }
	const morphInfluence = spring(0, morphOptions)

	useTask(() => {
		if (mesh && mesh.morphTargetInfluences) {
			mesh.morphTargetInfluences[0] = $morphInfluence
		}
	})

	function toggleMorph() {
		const newValue = $morphInfluence < 1 ? 1 : 0.5
		morphInfluence.set(newValue)
	}
</script>

<T.Group>
	<T.Mesh onclick={toggleMorph} bind:ref={mesh} geometry={baseGeometry} morphTargetInfluences={[0]}>
		<T.MeshStandardMaterial morphTargets={true} color="hotpink" />
	</T.Mesh>

	<T.Mesh position={[1.5, 0.5, 0]} onclick={toggleMorph}>
		<T.BoxGeometry args={[1, 1, 2]} />
		<T.MeshStandardMaterial color="green" />
	</T.Mesh>
</T.Group>
