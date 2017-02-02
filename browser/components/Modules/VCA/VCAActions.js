export function changeVCAGain(value, id) {
	return {
		type: 'CHANGE_VCA_GAIN',
		id,
		value
	}
}
