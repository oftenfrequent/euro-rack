export function addOscillator() {
	return { type: 'ADD_OSC' }
}

export function removeOscillator(id) {
	return {
		type: 'REMOVE_OSC',
		id
	}
}

export function changeOscFreq(frequency, id) { //, freqInputColor, cvInputColor) {
	return {
		type: 'CHANGE_OSC_FREQ',
		frequency,
		id
		// hasLFOAttached - added by middleware
	}
}

export function changeOscModFreq(frequency, id) {
	return {
		type: 'CHANGE_OSC_MOD_FREQ',
		frequency,
		id
	}
}