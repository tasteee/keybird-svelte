<script lang="ts">
	import { theme } from '$lib/consts/theme';
	import { T } from '@threlte/core';
	import { getRotation } from '../../../helpers/rotation';

	export let width: number = 1;
	export let height: number = 1;
	export let depth: number = 0.025;
	export let color: keyof typeof theme = 'white';
	export let rotationTurn: number = 0;
	export let rotationLean: number = 0;
	export let rotationTilt: number = 0;
	export let positionX: number = 0;
	export let positionY: number = 0;
	export let positionZ: number = 0;
	export let castShadow: boolean = true;
	export let receiveShadow: boolean = true;
	export let noFloor: boolean = false;

	const rotation = [rotationTurn, rotationLean, rotationTilt];
	const position = [positionY, positionZ, positionX];
	const size = [width, height, depth];
	const themeColor = theme[color] || color;
</script>

<T.Group {position} {rotation} scale={size}>
	<slot></slot>
	{#if !noFloor}
		<T.Mesh {castShadow} {receiveShadow}>
			<T.PlaneGeometry />
			<T.MeshToonMaterial color={themeColor} />
		</T.Mesh>
	{/if}
</T.Group>
