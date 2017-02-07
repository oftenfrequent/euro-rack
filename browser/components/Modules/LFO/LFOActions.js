export function addLFO() {
	return { type: 'ADD_LFO' }
}

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

export function changeLfoPercent(id, percent) {
	return {
		type: 'CHANGE_LFO_PERCENT',
		id,
		percent
	}
}

export function changeLfoMidValue(id, midValue) {
	return {
		type: 'CHANGE_LFO_MIDVALUE',
		id,
		midValue
	}
}