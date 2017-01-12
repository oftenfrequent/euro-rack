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
