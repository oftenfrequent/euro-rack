export function initSpeaker() {
	return {
		type: 'INIT_SPEAKER'
	}
}

export function changeBPM(value) {
	return {
		type: 'CHANGE_BPM',
		value
	}
}