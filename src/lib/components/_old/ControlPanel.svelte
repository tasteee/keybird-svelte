<!-- src/components/ControlPanel.svelte -->
<script>
	import { writable } from 'svelte/store';

	export let scale = writable(1);
	export let positionX = writable(0);
	export let positionY = writable(0);
	export let positionZ = writable(0);
	export let rotation = writable(0);
	export let rotationX = writable(0);
	export let rotationY = writable(0);
	export let rotationZ = writable(0);
</script>

<div class="control-panel">
	<label>
		Scale:
		<input type="range" min="0.1" max="2" step="0.1" bind:value={$scale} />
	</label>
	<h4>Rotation</h4>
	<label>
		x
		<input type="range" min="0" max="10" step="0.1" bind:value={$rotationX} />
	</label>
	<label>
		y
		<input type="range" min="0" max="10" step="0.1" bind:value={$rotationY} />
	</label>
	<label>
		z
		<input type="range" min="0" max="10" step="0.1" bind:value={$rotationZ} />
	</label>
</div>

<style>
	.control-panel {
		position: fixed;
		top: 10px;
		left: 10px;
		background: rgba(255, 255, 255, 0.8);
		padding: 10px;
		border-radius: 5px;
	}
</style>
