export function changeOscType(oscType) {
	return {
		type: 'CHANGE_OSC_TYPE',
		oscType
	}
}

export function changeOscFreq(frequency) {
	return {
		type: 'CHANGE_OSC_FREQ',
		frequency
	}
}

export function changeOscModFreq(frequency) {
	return {
		type: 'CHANGE_OSC_MOD_FREQ',
		frequency
	}
}
