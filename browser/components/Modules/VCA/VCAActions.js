export function addVCA() {
	return { type: 'ADD_VCA' }
}

export function removeVCA(id) {
	return {
		type: 'REMOVE_VCA',
		id
	}
}

export function changeVCAGain(value, id, gainType) {
	return {
		type: 'CHANGE_VCA_GAIN',
		id,
		gainType,
		value
	}
}

export function initializeVCA(id) {
	return {
		type: 'INITIALIZE_VCA',
		id
	}
}