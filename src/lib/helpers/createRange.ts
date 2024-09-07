// Usage:
// createRange(5)
// createRange(2, 4)
// createRange(5, 15, 5)
// createRange.from(2).to(4)
// createRange.step(5).from(5).to(15)

type TinyToFuncT = (end: number) => number[]
type ToFuncT = (end: number, start: number, step: number) => number[]
type FromFuncT = (start: number, step?: number) => { to: TinyToFuncT }
type StepFuncT = (step: number) => { from: FromFuncT }

type RangeT = {
	(a: number, b?: number, step?: number): number[]
	to: ToFuncT
	from: FromFuncT
	step: StepFuncT
}

const handleStartAndEnd = (a: number, b: number, step: number) => {
	const range = []

	if (a < b) {
		for (let index = a; index <= b; index += step) {
			range.push(index)
		}
	}

	if (a > b) {
		for (let index = a; index >= b; index -= step) {
			range.push(index)
		}
	}

	console.log(range)
	return range
}

export const createRange: RangeT = (a, b, step = 1) => {
	const hasBoth = typeof a === 'number' && typeof b === 'number'
	if (hasBoth) return handleStartAndEnd(a, b, step)
	return handleStartAndEnd(0, a, step)
}

createRange.from = (start: number, step: number = 1) => {
	return {
		to: (end: number) => createRange.to(start, end, step)
	}
}

createRange.step = (step: number) => {
	return {
		from: (start: number) => createRange.from(start, step)
	}
}

createRange.to = (end: number, start: number, step: number) => {
	return createRange(start, end, step)
}
