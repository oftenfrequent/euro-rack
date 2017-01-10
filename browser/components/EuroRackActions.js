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

export function triggerAttackRelease() {
	return {
		type: 'TRIGGER_ATTACK_RELEASE'
	}
}


//----Filter Actions-------------//
export function changeFilType(oscType) {
	return {
		type: 'CHANGE_FIL_TYPE',
		oscType
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

