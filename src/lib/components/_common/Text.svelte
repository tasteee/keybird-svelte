<script lang="ts">
	import { T } from '@threlte/core'
	import { Text } from '@threlte/extras'
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
	import { theme } from '$lib/constants/theme'
	import { useLoader } from '@threlte/core'

	type ColorKeyT = keyof typeof theme.colors

	type PropsT = {
		size: number
		color: ColorKeyT
		fontName: string
		text: string
	}

	const DEFAULT_COLOR = theme.colors.white0
	const DEFAULT_FONT_NAME = 'polySans'
	const DEFAULT_SIZE = 0.3
	const props: PropsT = $props()

	const fontSize = props.size ? props.size * 0.3 : DEFAULT_SIZE
	const color = theme.colors[props.color] || DEFAULT_COLOR
	const fontName = props.fontName || DEFAULT_FONT_NAME
	const fontPath = theme.getFontPath(fontName)
	let font = useLoader(FontLoader).load(fontPath)
</script>

<T.Mesh receiveShadow castShadow>
	<Text {...props} receiveShadow castShadow smooth={1} {fontSize} {color} font1={font} text={props.text} />
	<T.MeshMatcapMaterial />
</T.Mesh>
