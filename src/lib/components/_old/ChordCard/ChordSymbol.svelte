<script lang="ts">
	import { T } from '@threlte/core'
	import { fonts, theme } from '$lib/consts/theme'
	import { getRotation } from '../../../helpers/rotation'
	import { Text3DGeometry } from '@threlte/extras'
	export let symbol: string = ''
</script>

<T.Mesh receiveShadow position={[-5.8, 0.001, 2.2]} rotation={getRotation(50, 0, 50)}>
	<Text3DGeometry text={symbol} font={fonts[0]} depth={0.1} size={0.25} smooth={1} />
	<T.MeshToonMaterial color={theme.base0} />
</T.Mesh>
