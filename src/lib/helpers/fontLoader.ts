// import { NOOP } from '$lib/constants/common'
// import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import { theme } from '$lib/constants/theme'

// const loader = new FontLoader()

// const getFontPath = (name: string) => {
// 	const fontDetails = theme.fonts[name as keyof typeof theme.fonts]
// 	return fontDetails.path
// }

// const setFontValue = (name: string, value: any) => {
// 	theme.fonts[name as keyof typeof theme.fonts].font = value
// }

// const loadFont = (name: string) => {
// 	const path = getFontPath(name)

// 	const handleSuccess = (font: Font) => {
// 		console.log('font loaded:', font)
// 		setFontValue(name, font)
// 	}

// 	const handleError = (error: unknown) => {
// 		console.log('GOT AN ERROR', error)
// 		throw error
// 	}

// 	loader.load(path, handleSuccess, NOOP, handleError)
// }

// for (const fontData of Object.values(theme.fonts)) {
// 	console.log({ fontData })
// 	loadFont(fontData.name)
// }
