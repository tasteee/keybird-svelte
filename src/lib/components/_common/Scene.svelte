<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { interactivity } from '@threlte/extras'
	import Lighting from './Lighting.svelte'
	import Camera from './Camera.svelte'
	import Text from './Text.svelte'
	import Block from './Block.svelte'
	import { theme } from '$lib/constants/theme'
	import Backdrop from './Backdrop.svelte'
	import MouseLight from '../MouseLight.svelte'
	import WallGrid from '../WallGrid.svelte'
	import * as THREE from 'three'

	const { scene } = useThrelte()

	$effect(() => {
		scene.background = new THREE.Color(theme.colors.gray0)
	})
	interactivity()
</script>

<Backdrop />
<Lighting />
<Camera />
<WallGrid />
<MouseLight />

<Block rotation={[0, 0, 0]} color="pink0" position={[0, 0, 4]} />
<Text size={10} color="white0" fontName="polySans" text="taste ink yolo!" />
