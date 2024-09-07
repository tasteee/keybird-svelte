<script lang="ts">
	import { fonts, theme } from '$lib/consts/theme'
	import { T } from '@threlte/core'
	import { Text3DGeometry } from '@threlte/extras'
	import { getRotation } from '../../../helpers/rotation'
	export let name: string = ''
</script>

<T.Mesh scale={[0.5, 0.5, 0.5]} position={[-6.2, 0.05, 2.2]} rotation={getRotation(50, 0, 50)}>
	<Text3DGeometry text={name} font={fonts[1]} depth={0.1} size={0.35} smooth={1} />
	<T.MeshToonMaterial color={theme.base5} />
</T.Mesh>
