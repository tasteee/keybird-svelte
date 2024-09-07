<script lang="ts">
	import { T, useThrelte } from '@threlte/core'
	import { SoftShadows, TransformControls } from '@threlte/extras'
	import type { DirectionalLight, DirectionalLightHelper } from 'three'

	const { scene } = useThrelte()

	let light0: DirectionalLight
	let light0Helper: DirectionalLightHelper

	function updateHelper() {
		if (light0Helper) {
			light0Helper.update()
		}
	}
</script>

<!-- <LightWithControls type="DirectionalLight" position={[0, 0, -110]} castShadow /> -->

<SoftShadows size={50} />

<!-- <T.AmbientLight intensity={0.6} /> -->
<!-- <T.PointLight size={55} position={[0, -20, 0]} /> -->

<T.DirectionalLight intensity={0.1} position={[0, 0, 20]} bind:ref={light0}></T.DirectionalLight>

{#if light0}
	<TransformControls object={light0} on:objectChange={updateHelper} />
	<T.DirectionalLightHelper args={[light0]} bind:ref={light0Helper} />
{/if}
<!-- <Sky turbidity={20} rayleigh={1.4} azimuth={180} elevation={6} mieCoefficient={0.00021} mieDirectionalG={0.83} /> -->
