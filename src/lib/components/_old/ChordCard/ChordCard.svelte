<script lang="ts">
	import { T } from '@threlte/core'
	import { theme } from '$lib/consts/theme'

	import { getRotation } from '../../../helpers/rotation'
	import { get } from 'svelte/store'
	import * as Tonal from 'tonal'
	import PianoRoll from '../PianoRoll.svelte'
	import ChordSymbol from './ChordSymbol.svelte'
	import ChordName from './ChordName.svelte'
	import ChordNotes from './ChordNotes.svelte'
	import { Edges, Outlines } from '@threlte/extras'
	import { Mesh } from 'three'

	export let symbol: string = ''
	export let rowIndex: number = 0
	export let columnIndex: number = 0
	export let rowLength: number = 0

	const chord = Tonal.Chord.get(symbol)
	const [positionX, positionY, positionZ] = [0 + rowIndex * 5.25, 0, 0 + columnIndex * -6.75]
	const lightPosition = [positionX - 1, positionY + 0.5, 0]
</script>

<T.Group position={[positionX, positionY, positionZ]}>
	<!-- Container plane. -->
	<T.Mesh castShadow={true} receiveShadow={true}>
		<T.BoxGeometry args={[3.5, 0.15, 5]} />
		<T.MeshToonMaterial color={theme.white} />
		<Outlines color={theme.black} />
		<Edges color={theme.black} />
	</T.Mesh>

	<T.Mesh
		castShadow={true}
		receiveShadow={true}
		position={[-1.1, 0.08, 2.25]}
		scale={[0.5, 0.5]}
		rotation={getRotation(50, 0, 0)}
	>
		<T.CircleGeometry />
		<T.MeshToonMaterial color={theme.accentDark} />
		<Outlines color={theme.black} />
		<Edges color={theme.black} />
		<!-- <T.PointLight color={theme.white} intensity={5} /> -->
	</T.Mesh>

	<T.Mesh
		castShadow={true}
		receiveShadow={true}
		position={[-1.1, 0.1, 2.25]}
		scale={[0.3, 0.3]}
		rotation={getRotation(50, 0, 0)}
	>
		<T.CircleGeometry args={[1, 1, 1.6]} />
		<T.MeshToonMaterial color={theme.black} />
		<Outlines color={theme.white} />
		<Edges color={theme.white} />
	</T.Mesh>

	<T.Group position={[7.25, 0, 0]} rotation={getRotation(0, 0, 0)}>
		<ChordNotes notes={chord.notes} />
		<ChordSymbol {symbol} />
		<ChordName name={chord.name} />
	</T.Group>

	<PianoRoll chordSymbol={symbol} />

	<T.PointLight color={theme.white} castShadow={true} intensity={80} position={lightPosition} />
</T.Group>
