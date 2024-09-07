<script lang="ts">
	import { T } from '@threlte/core'
	import { theme } from '$lib/consts/theme'
	import { getRotation } from '../../helpers/rotation'
	import * as Tonal from 'tonal'
	import { Edges, Outlines } from '@threlte/extras'
	import Pane from './_common/Pane.svelte'
	import { noteHelper } from '$lib/helpers/note.helper'

	export let chordSymbol: string = ''
	const notes = Tonal.Chord.get(chordSymbol).notes

	const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B']
	const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#', 'C#', 'D#', 'F#', 'G#', 'A#']
	const blackKeysPosition = [0.03, 0.09, 0.209, 0.269, 0.33, 0.45, 0.51, 0.63, 0.69, 0.75]

	const getWhiteKeyPosition = (keyNote: string, index: number) => {
		return 0.0001 + index * 0.06
	}

	const getBlackKeyPosition = (keyNote: string, index: number) => {
		return blackKeysPosition[index]
	}

	const getKeyColor = (keyNote: string) => {
		const isSharp = noteHelper.checkIfNoteIsSharp(keyNote)
		const isInChord = notes.includes(keyNote)
		if (!isInChord) return isSharp ? theme.black : theme.white
		return theme.accentDark
	}
</script>

<!-- [3.48, 0.15, 1] -->
<Pane
	castShadow={true}
	receiveShadow={true}
	width={3.5}
	height={0.2}
	depth={1}
	positionY={-1.39}
	positionX={-1.97}
	positionZ={0.05}
	rotationTurn={0}
	rotationLean={0}
	rotationTilt={0}
	noFloor={true}
>
	{#each whiteKeys as keyNote, index}
		<T.Mesh
			scale={[1, 1, 0.05]}
			position={[getWhiteKeyPosition(keyNote, index), 1, 0]}
			rotation={getRotation(0, 100, 0)}
		>
			<T.BoxGeometry />
			<T.MeshToonMaterial color={getKeyColor(keyNote)} />
			<Edges color={theme.black} />
		</T.Mesh>
	{/each}

	{#each blackKeys as keyNote, index}
		<T.Mesh
			scale={[0.75, 1, 0.05]}
			position={[getBlackKeyPosition(keyNote, index), 1.5, -0.15]}
			rotation={getRotation(0, 100, 0)}
		>
			<T.BoxGeometry />
			<T.MeshToonMaterial color={getKeyColor(keyNote)} />
			<Edges color={notes.includes(keyNote) ? theme.black : theme.white} />
		</T.Mesh>
	{/each}

	<!-- <T.PointLight color={theme.white} intensity={20} position={[0.25, 5, -0.25]} /> -->
</Pane>
