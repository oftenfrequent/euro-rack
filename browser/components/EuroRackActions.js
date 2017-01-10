export function connectJack(selectedModule) {
	return {
		type: 'CONNECT_JACK',
		selectedModule
	}
}






//----Oscillator Actions-------------//
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
