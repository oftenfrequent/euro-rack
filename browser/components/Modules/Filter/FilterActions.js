export function changeFilType(id, filterType) {
	return {
		type: 'CHANGE_FIL_TYPE',
		id,
		filterType
	}
}

export function changeFilRolloff(id, rolloff) {
	return {
		type: 'CHANGE_FIL_ROLLOFF',
		id,
		rolloff
	}
}

export function changeFilFreq(id, frequency) {
	return {
		type: 'CHANGE_FIL_FREQ',
		id,
		frequency
	}
}