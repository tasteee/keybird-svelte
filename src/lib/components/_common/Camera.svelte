<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import { Pane, Slider, Checkbox, Color, Point } from 'svelte-tweakpane-ui'
	import * as THREE from 'three'

	const canMove = true

	let enableDamping = $state(true)
	let rotateSpeed = $state(1)
	let zoomToCursor = $state(false)
	let zoomSpeed = $state(1)
	let minPolarAngle = $state(0)
	let maxPolarAngle = $state(Math.PI)
	let enableZoom = $state(true)
	let enablePan = $state(true)
	let enableRotate = $state(true)
	let fov = $state(75)
	let near = $state(0.1)
	let far = $state(1000)
	let aspect = window.innerWidth / window.innerHeight

	// Get the Threlte context
	const { camera } = useThrelte()
	let cameraPosition = $state([0, 0, 20])
	let zoom = $state(1)

	// Define the reset function
	globalThis.resetCamera = () => {
		cameraPosition = [0, 0, 20]
		zoom = 1
	}
</script>

<T.PerspectiveCamera
	makeDefault
	{zoom}
	{near}
	{far}
	{fov}
	{aspect}
	{zoomToCursor}
	position={cameraPosition}
	left={-window.innerWidth / 2}
	right={window.innerWidth / 2}
	top={window.innerHeight / 2}
	bottom={-window.innerHeight / 2}
>
	{#if canMove}
		<OrbitControls {zoomToCursor} {enablePan} {enableDamping} {enableZoom} {enableRotate} {zoomSpeed} {rotateSpeed} />
	{:else}
		<T.Group lookAt={[0, 0, 0]} />
	{/if}
</T.PerspectiveCamera>
