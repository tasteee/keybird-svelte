<script lang="ts">
	import { T } from '@threlte/core'
	import { Pane, Slider, Checkbox, Color, Point } from 'svelte-tweakpane-ui'
	import type { SvelteComponent } from 'svelte'

	type LightType = keyof typeof LIGHT_TYPE_MAP

	const LIGHT_TYPE_MAP = {
		DirectionalLight: T.DirectionalLight,
		PointLight: T.PointLight,
		SpotLight: T.SpotLight,
		AmbientLight: T.AmbientLight,
		HemisphereLight: T.HemisphereLight,
		RectAreaLight: T.RectAreaLight
		// AreaLight: T.AreaLight
	}

	export let type: LightType
	export let position = [0, 0, 0]
	export let intensity = 1
	export let color = '#ffffff'
	export let castShadow = false

	$: lightComponent = LIGHT_TYPE_MAP[type]

	let x = position[0]
	let y = position[1]
	let z = position[2]

	$: position = [x, y, z]
</script>

<Pane>
	<Point
		label="Position"
		{x}
		{y}
		{z}
		on:change={({ detail }) => {
			x = detail.value.x
			y = detail.value.y
			z = detail.value.z
		}}
	/>
	<Slider label="Intensity" bind:value={intensity} min={0} max={10} step={0.1} />
	<Color label="Color" bind:value={color} />
	<Checkbox label="Cast Shadow" bind:value={castShadow} />
</Pane>

<T is={lightComponent} {position} {intensity} {color} {castShadow} />
