// import { createNoise2D } from 'simplex-noise'

// export function generateNoise(width: number, height: number) {
// 	const generator = createNoise2D()

// 	function noise(x: number, y: number) {
// 		// Rescale from -1.0:+1.0 to 0.0:1.0
// 		return generator(x, y) / 2 + 0.5
// 	}

// 	const noiseMap = [] as number[][]

// 	for (let y = 0; y < height; y++) {
// 		noiseMap[y] = []

// 		for (let x = 0; x < width; x++) {
// 			let nx = x / width - 0.5,
// 				ny = y / height - 0.5
// 			noiseMap[y][x] = noise(nx, ny)
// 		}
// 	}

// 	return noiseMap
// }

import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

const createNoiseMap = (width: number, height: number, seed: number, frequency: number): Map2D => {
	const simplex = createNoise2D(() => Math.random())
	const map = createMap2D(width, height)

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const nx = x / width - 0.5
			const ny = y / height - 0.5

			// Generate noise based on frequency
			const noiseValue = (simplex(nx * frequency, ny * frequency) + 1) / 2

			map.set(x, y, noiseValue)
		}
	}

	return map
}

const blendNoiseMaps = (
	width: number,
	height: number,
	seed: number,
	frequency: number,
	numOctaves: number,
	persistence: number
): Map2D => {
	const output = createMap2D(width, height)
	let totalAmplitude = 0
	let amplitude = 1
	let maxAmplitude = 1
	let frequencyMultiplier = 1

	for (let octave = 0; octave < numOctaves; octave++) {
		const noiseMap = createNoiseMap(width, height, seed + octave, frequency * frequencyMultiplier)

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				// Add weighted noise to output
				const existingValue = output.get(x, y)
				const noiseValue = noiseMap.get(x, y) * amplitude
				output.set(x, y, existingValue + noiseValue)
			}
		}

		// Update amplitude and frequency for the next octave
		totalAmplitude += amplitude
		amplitude *= persistence // Decrease amplitude for higher frequency octaves
		frequencyMultiplier *= 2 // Double the frequency for more detailed noise
	}

	// Normalize the result by dividing by total amplitude
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			output.set(x, y, output.get(x, y) / totalAmplitude)
		}
	}

	return output
}

// Type definitions
type Map2D = {
	width: number
	height: number
	size: number
	data: Float32Array
	get: (x: number, y: number) => number
	set: (x: number, y: number, value: number) => void
}

// Utility functions
const createMap2D = (width: number, height: number): Map2D => {
	const size = width * height
	const data = new Float32Array(size)

	const get = (x: number, y: number) => data[x + width * y]
	const set = (x: number, y: number, value: number) => {
		data[x + width * y] = value
	}

	return { width, height, size, data, get, set }
}

const addMaps = (output: Map2D, maps: Map2D[], amplitudes: number[]): void => {
	if (maps.length !== amplitudes.length) {
		throw new Error('Map count and amplitude count must be the same')
	}

	for (let y = 0; y < output.height; y++) {
		for (let x = 0; x < output.width; x++) {
			let value = 0
			for (let i = 0; i < maps.length; i++) {
				value += amplitudes[i] * maps[i].get(x, y)
			}
			output.set(x, y, value)
		}
	}
}

const generateIslandMapWithBlendedNoise = (
	width: number,
	height: number,
	seed: number,
	numOctaves: number,
	persistence: number,
	distanceFunction: keyof typeof distanceFunctions,
	shapeValue: number
): Map2D => {
	const blendedNoise = blendNoiseMaps(width, height, seed, 2, numOctaves, persistence)
	const finalMap = createMap2D(width, height)
	const distanceFn = distanceFunctions[distanceFunction]

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const nx = 2 * (x / width) - 1
			const ny = 2 * (y / height) - 1

			const elevationValue = blendedNoise.get(x, y)
			const distance = Math.min(1, Math.max(0, distanceFn(nx, ny)))
			const finalValue = reshape(elevationValue, distance, shapeValue)

			finalMap.set(x, y, finalValue)
		}
	}

	return finalMap
}

const makeNoise = (width: number, height: number, frequency: number, seed: number): Map2D => {
	// Implement noise generation (e.g., Perlin noise)
	// For this example, we'll use a simple random noise
	const map = createMap2D(width, height)
	// .Random is not a function
	const random = () => THREE.MathUtils.seededRandom(seed)
	// options: randFloat || randInt || randFloatSpread

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const value = random()
			map.set(x, y, value)
		}
	}

	return map
}

const mixNoise = (output: Map2D, spectrum: number[], frequency: number, seed: number): void => {
	const maps: Map2D[] = []
	let scale = 0
	const amplitudes: number[] = []

	for (let octave = 0, exponent = 1; octave < spectrum.length; octave++, exponent *= 2) {
		scale += spectrum[octave]
		const noiseMap = makeNoise(output.width, output.height, frequency * exponent, seed + octave)
		maps.push(noiseMap)
		amplitudes.push(spectrum[octave])
	}

	const normalizedAmplitudes = amplitudes.map((a) => a / scale)
	addMaps(output, maps, normalizedAmplitudes)
}

// Distance functions
const distanceFunctions = {
	SquareBump: (nx: number, ny: number) => 1 - (1 - nx * nx) * (1 - ny * ny),
	EuclideanSquared: (nx: number, ny: number) => Math.min(1, (nx * nx + ny * ny) / Math.sqrt(2)),
	Diagonal: (nx: number, ny: number) => Math.max(Math.abs(nx), Math.abs(ny)),
	Manhattan: (nx: number, ny: number) => (Math.abs(nx) + Math.abs(ny)) / 2,
	Euclidean: (nx: number, ny: number) => Math.hypot(nx, ny) / Math.sqrt(2),
	Hyperboloid: (nx: number, ny: number) =>
		(Math.hypot(nx, ny, 0.2) - 0.2) / (Math.hypot(1, 1, 0.2) - 0.2),
	Blob: (nx: number, ny: number) =>
		((Math.hypot(nx, ny - 0.05) ** 2 / Math.sqrt(2)) * 2.7) /
		(3 - Math.sin(5 * Math.atan2(ny - 0.05, nx)))
}

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

const reshape = (elevation: number, distance: number, shapeValue: number) => {
	return lerp(elevation, 1 - distance, shapeValue)
}

const generateIslandMap = (
	width: number,
	height: number,
	seed: number,
	distanceFunction: keyof typeof distanceFunctions,
	shapeValue: number
): number[][] => {
	const simplex = createNoise2D(() => Math.random())
	const map: number[][] = Array(height)
		.fill(0)
		.map(() => Array(width).fill(0))
	const distanceFn = distanceFunctions[distanceFunction]
	const centerX = width / 2
	const centerY = height / 2
	const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const nx = x / width - 0.5
			const ny = y / height - 0.5

			// Generate noise
			const noiseValue = (simplex(nx * 4, ny * 4) + 1) / 2

			// Calculate distance from center
			const distance = distanceFn(nx, ny)
			const normalizedDistance = distance / maxDistance

			// Combine noise and distance
			let value = noiseValue * (1 - normalizedDistance)

			// Apply shape value
			value = Math.pow(value, 1 / shapeValue)

			// Ensure water around the edges
			if (normalizedDistance > 0.8) {
				value = 0
			}

			map[y][x] = value
		}
	}

	return map
}

export { generateIslandMap, distanceFunctions }

export type VoxelT = {
	position: THREE.Vector3
	value: number
}

const generateBlendedVoxels = (waterLevel: number, numOctaves: number, persistence: number) => {
	// Define the map size and seed
	const width = 128
	const height = 128
	const seed = 985

	// Generate a blended noise map using multiple octaves for richer terrain
	const blendedHeightmap = blendNoiseMaps(width, height, seed, 2, numOctaves, persistence)

	const voxels: { position: THREE.Vector3; value: number }[] = []

	// Loop through the heightmap and create voxels
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			// Retrieve the blended noise value for this point
			const terrainHeight = Math.floor(blendedHeightmap.get(x, y) * 24) // Scale height as needed

			// Always add water voxels up to the water level
			for (let z = 0; z <= waterLevel; z++) {
				voxels.push({
					position: new THREE.Vector3(x, z, y), // Position of the water voxel
					value: z === waterLevel ? 0.3 : 0 // Water surface is slightly higher value
				})
			}

			// Add terrain voxels above the water level
			for (let z = waterLevel + 1; z <= terrainHeight; z++) {
				voxels.push({
					position: new THREE.Vector3(x, z, y), // Position of the terrain voxel
					value: blendedHeightmap.get(x, y) // Use the heightmap value for the voxel
				})
			}
		}
	}

	return voxels
}

const generateVoxels = (waterLevel: number) => {
	// SquareBump || EuclideanSquared || Diagonal || Manhattan || Euclidean || Hyperboloid
	// const heightmap = generateIslandMapWithBlendedNoise(128, 128, 985, 2, 0.5, 'EuclideanSquared', 0.97)
	const heightmap = generateIslandMap(128, 128, 985, 'EuclideanSquared', 0.97) // also a round pyramid shape...
	const voxels: { position: THREE.Vector3; value: number }[] = []
	const height = heightmap.length
	const width = heightmap[0].length

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const terrainHeight = Math.floor(heightmap[y][x] * 24) // Scale height as needed

			// Always add water voxels up to water level
			for (let z = 0; z <= waterLevel; z++) {
				voxels.push({
					position: new THREE.Vector3(x, z, y), // Remove voxelSize multiplication here
					value: z === waterLevel ? 0.3 : 0 // Water surface is slightly higher value
				})
			}

			// Add terrain voxels above water level
			for (let z = waterLevel + 1; z <= terrainHeight; z++) {
				voxels.push({
					position: new THREE.Vector3(x, z, y), // Remove voxelSize multiplication here
					value: heightmap[y][x]
				})
			}
		}
	}

	return voxels
}
export const generate = () => generateVoxels(0.3)
export const generate2 = () => generateBlendedVoxels(22, 64, 333)
