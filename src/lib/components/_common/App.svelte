<script lang="ts">
	import '../../../styles/reset.css'
	import { Canvas, useThrelte } from '@threlte/core'
	import Scene from './Scene.svelte'
	import ShadowWrapper from './ShadowWrapper.svelte'
	import * as THREE from 'three'
	import { theme } from '../../constants/theme'
</script>

<Canvas shadows={true}>
	<!-- <ShadowWrapper> -->
	<Scene></Scene>
	<!-- </ShadowWrapper> -->
</Canvas>

<style>
	:global(canvas) {
		height: 100vh !important;
	}
</style>
