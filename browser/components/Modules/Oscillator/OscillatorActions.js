export function addOscillator() {
	return { type: 'ADD_OSC' }
}

export function changeOscType(oscType, id) {
	return {
		type: 'CHANGE_OSC_TYPE',
		oscType,
		id
	}
}

export function changeOscFreq(frequency, id, freqInputColor, cvInputColor) {
	return {
		type: 'CHANGE_OSC_FREQ',
		frequency,
		id,
		freqInputColor,
		cvInputColor
	}
}

export function changeOscModFreq(frequency, id) {
	return {
		type: 'CHANGE_OSC_MOD_FREQ',
		frequency,
		id
	}
}