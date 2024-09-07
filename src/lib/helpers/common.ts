import random from 'random'
import memoize from 'just-memoize'
import compose from 'just-compose'
import curry from 'just-curry'

import { createRange } from './createRange'

export const func = {
	curry,
	memoize,
	compose
}

export const make = {
	range: createRange
}

export const get = {
	random: {
		boolean: random.bool,
		integer: random.int,
		float: random.float
	}
}
