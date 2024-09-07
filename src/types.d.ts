import './types/just-curry'

declare module 'crusoe'
declare module 'fastnoise-lite'

type AnyObjectT = Record<string, any>

type CoordinatesT = {
	x: number
	y: number
	z: number
}

type XZCoordinatesT = {
	x: number
	z: number
}

type BlockDataT = {
	key: string
	type: string
	color: string
	scale: number[]
	height: number
	geometry: THREE.BoxGeometry
	material: THREE.MeshStandardMaterial
	transparency: number
	arrayPosition: number[]
	elevation: number
	coordinates: {
		x: number
		y: number
		z: number
	}
}
