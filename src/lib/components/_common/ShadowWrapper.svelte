<script lang="ts">
	// import { T } from '@threlte/core'
	import { Pane, Slider, Checkbox, Color, Point } from 'svelte-tweakpane-ui'
	import { CSM } from '@threlte/extras'
	import * as THREE from 'three'

	const lightDirection = new THREE.Vector3(1, -1, 1).normalize()
</script>

<CSM enabled args={{ lightDirection }}>
	<slot></slot>
</CSM>
