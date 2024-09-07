import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import PolySans_Regular from './PolySans_Regular.json'
import SpaceRegular from './SpaceRegular.json'

const colors = {
	gunmetal: '#0F2021',
	white0: '#FFFFFF',
	black0: '#010002',
	gray0: '#1D1E20',
	gray1: '#2D2E32',
	purple0: '#9747FC',
	purpleAccent0: '#BD87F2',
	yellow0: '#FDCE28',
	yellowAccent1: '#FIE5C4',
	blue0: '#00DAFE',
	blueAccent0: '#B2E2DD',
	pink0: '#F23EB9',
	pink1: '#EE86FD',
	green0: '#12F294',
	greenAccent1: '#FIE9D4',
	red0: '#FF613A',
	tan0: '#D2D2C6',
	tan1: '#F4EAD3',
	tan2: '#918C80',
	brown0: '#302D22',
	brown1: '#886957'
}

const fonts = {
	polySans: { name: 'polySans', font: new Font(PolySans_Regular), path: 'fonts/PolySans_Regular.json' },
	spaceRegular: { name: 'spaceRegular', font: new Font(SpaceRegular), path: 'fonts/SpaceRegular.json' }

	// spaceBold: { name: 'spaceBold', font: null, path: '/SpaceGroteskBold.json' },
	// spaceLightRegular: { name: 'spaceLightRegular', font: null, path: '/SpaceGroteskLightRegular.json' },
	// spaceMediumRegular: { name: 'spaceMediumRegular', font: null, path: '/SpaceGroteskMediumRegular.json' },
	// spaceSemiBoldRegular: { name: 'spaceSemiBoldRegular', font: null, path: '/SpaceGroteskSemiBoldRegular.json' }
}

const getFontPath = (name: string) => {
	return fonts[name as keyof typeof fonts].path
}

const getFontData = (name: string) => {
	return fonts[name as keyof typeof fonts].font
}

export const theme = {
	getFontData,
	getFontPath,
	colors,
	fonts
}
