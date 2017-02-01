export function changeOscType(oscType, id) {
	return {
		type: 'CHANGE_OSC_TYPE',
		oscType,
		id
	}
}

export function changeOscFreq(frequency, id) {
	return {
		type: 'CHANGE_OSC_FREQ',
		frequency,
		id
	}
}

export function changeOscModFreq(frequency, id) {
	return {
		type: 'CHANGE_OSC_MOD_FREQ',
		frequency,
		id
	}
}