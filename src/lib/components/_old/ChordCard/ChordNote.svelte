<script lang="ts">
	import { fonts } from '$lib/consts/theme';
	import { T } from '@threlte/core';
	import { Text3DGeometry } from '@threlte/extras';
	import { getRotation } from '../../../helpers/rotation';
	export let note: string = '';
</script>

<T.Mesh scale={[0.5, 0.5, 0.5]} position={[-6.4, 0.05, 2.2]} rotation={getRotation(50, 0, 50)}>
	<Text3DGeometry text={note} font={fonts[1]} depth={0.05} size={0.35} smooth={1} />
	<T.MeshToonMaterial color="#a7bcc9" />
</T.Mesh>
