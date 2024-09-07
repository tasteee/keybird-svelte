<script lang="ts">
	import { T } from '@threlte/core'
	import * as THREE from 'three'
	import { theme } from '$lib/constants/theme'

	const props = $props()
	const rotation = props.rotation || [0, 0, 0]
	const size = props.size || [1, 1, 1]
	const color = theme.colors[props.color as keyof typeof theme.colors] || theme.colors.white0
	console.log(props.position)
</script>

<T.Mesh {rotation} receiveShadow castShadow position={props.position} {size}>
	<T.BoxGeometry />
	<T.MeshStandardMaterial {color} />
</T.Mesh>
