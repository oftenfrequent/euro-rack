export function connectJack(module, direction, cvName, toneObject) {
	return {
		type: 'CONNECT_JACK',
		module,
		direction,
		cvName,
		toneObject
	}
}
export function disconnectJack(color) {
	return {
		type: 'DISCONNECT_JACK',
		color
	}
}








//----Envelope Actions-------------//
export function changeCurve(curveType) {
	return {
		type: 'CHANGE_ENV_CURVE_TYPE',
		curveType
	}
}

export function changeValue(component, value) {
	return {
		type: 'CHANGE_ENV_COMP_VALUE',
		component,
		value
	}
}


//----Filter Actions-------------//
export function changeFilType(filterType) {
	return {
		type: 'CHANGE_FIL_TYPE',
		filterType
	}
}

export function changeFilRolloff(rolloff) {
	return {
		type: 'CHANGE_FIL_ROLLOFF',
		rolloff
	}
}

export function changeFilFreq(frequency) {
	return {
		type: 'CHANGE_FIL_FREQ',
		frequency
	}
}


//----LFO Actions-------------//
export function changeLfoType(oscType) {
	return {
		type: 'CHANGE_LFO_TYPE',
		oscType
	}
}

export function changeLfoFreq(frequency) {
	return {
		type: 'CHANGE_LFO_FREQ',
		frequency
	}
}

export function changeLfoMin(minValue) {
	return {
		type: 'CHANGE_LFO_MIN',
		minValue
	}
}

export function changeLfoMax(maxValue) {
	return {
		type: 'CHANGE_LFO_MAX',
		maxValue
	}
}


//----MIDI Actions-------------//
export function errorConnectingMidi(error) {
	return {
		type: 'MIDI_CONNECTION_ERROR',
		error
	}
}
export function setMidiInputDevice(input) {
	return {
		type: 'SET_MIDI_INPUT',
		input
	}
}
export function midiGateAttackTrigger(freq) {
	return {
		type: 'MIDI_GATE_ATTACK_TRIGGER',
		freq
	}
}
export function midiGateReleaseTrigger(freq) {
	return {
		type: 'MIDI_GATE_RELEASE_TRIGGER',
		freq
	}
}
// export function midiFreqTrigger(freq) {
// 	return {
// 		type: 'MIDI_FREQ_TRIGGER',
// 		freq
// 	}
// }
