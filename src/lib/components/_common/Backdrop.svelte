<script lang="ts">
	import { T } from '@threlte/core'
	import { theme } from '$lib/constants/theme'
</script>

<T.Mesh castShadow receiveShadow position={[0, 0, 4]}>
	<T.PlaneGeometry args={[10, 10]} />
	<T.MeshStandardMaterial color={theme.colors.gray1} />
</T.Mesh>
