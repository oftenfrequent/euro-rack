export function changeLfoType(id, oscType) {
	return {
		type: 'CHANGE_LFO_TYPE',
		id,
		oscType
	}
}

export function changeLfoFreq(id, frequency) {
	return {
		type: 'CHANGE_LFO_FREQ',
		id,
		frequency
	}
}

export function changeLfoMin(id, minValue) {
	return {
		type: 'CHANGE_LFO_MIN',
		id,
		minValue
	}
}

export function changeLfoMax(id, maxValue) {
	return {
		type: 'CHANGE_LFO_MAX',
		id,
		maxValue
	}
}