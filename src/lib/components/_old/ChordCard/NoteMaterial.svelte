<script lang="ts">
	import { theme } from '$lib/consts/theme'
	import { noteHelper } from '$lib/helpers/note.helper'
	import { T } from '@threlte/core'
	import * as Tonal from 'tonal'
	export let note: string = ''
	export let isOpposite = false

	const isSharp = noteHelper.checkIfNoteIsSharp(note)
</script>

{#if isOpposite}
	{#if isSharp}
		<T.MeshToonMaterial color={theme.white} />
	{/if}

	{#if !isSharp}
		<T.MeshToonMaterial color={theme.black} />
	{/if}
{/if}

{#if !isOpposite}
	{#if isSharp}
		<T.MeshToonMaterial color={theme.black} />
	{/if}

	{#if !isSharp}
		<T.MeshToonMaterial color={theme.white} />
	{/if}
{/if}
