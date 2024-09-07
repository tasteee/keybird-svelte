<script lang="ts">
	import * as THREE from 'three'
	import { T, useThrelte } from '@threlte/core'
	import Block from './_common/Block.svelte'
	import { make } from '$lib/helpers/common'
	import { DEG2RAD } from 'three/src/math/MathUtils'

	const { camera } = useThrelte()
	let lightPosition = $state([0, 0, 10])

	function getViewWidth() {
		const distance = camera.current.position.z
		const vFOV = camera.current.fov * DEG2RAD
		const height = 2 * Math.tan(vFOV / 2) * distance
		const viewWidth = height * camera.current.aspect
		return Math.floor(viewWidth)
	}

	function getViewHeight() {
		const distance = camera.current.position.z
		const vFOV = camera.current.fov * DEG2RAD
		const height = 2 * Math.tan(vFOV / 2) * distance
		return Math.floor(height)
	}

	function handleMouseMove(event: MouseEvent) {
		const windowHeight = window.innerHeight
		const windowWidth = window.innerWidth
		const mouseX = event.clientX
		const mouseY = event.clientY
		const cameraZ = camera.current.position.z
		const viewWidth = getViewWidth()
		const viewHeight = getViewHeight()
		console.log(viewWidth, viewHeight)
		const xDecimal = mouseX / windowWidth
		const yDecimal = mouseY / windowHeight
		const xValue = Math.ceil(viewWidth * xDecimal - viewWidth / 2)
		const yValue = Math.ceil(viewHeight * yDecimal - viewHeight / 2)
		const newPosition = [xValue, yValue, 10]
		lightPosition = newPosition

		// horizontally... [0, 1, 2, 3, 4, 5, 6, 7] which maps to newPosition[0] as [-6, -4, -2, 0, 2, 4, 6, 8]
		// determine the corresponding index to the mouseX position.

		// so if the screen is 1000px wide and the mouseX is 358,
		// then

		// divide the screen into 8x8 grid
		// horizontally... [0, 1, 2, 3, 4, 5, 6, 7]
		// determine the corresponding index to the mouseX position.
	}

	$effect(() => {})
</script>

<svelte:window on:mousemove={handleMouseMove} />
<T.DirectionalLight position={lightPosition} intensity={5} />
<Block position={lightPosition} size={[20, 20, 20]} color="yellow0" />
<!-- <Block rotation={[0, 0, 0]} color={THREE.colors.pink0} position={[0, 0, 4]} /> -->

<!-- <T.PointLight position={lightPosition} intensity={100} distance={25} decay={25} />
<T.DirectionalLight position={lightPosition} intensity={1} castShadow /> -->
