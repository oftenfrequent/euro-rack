export function connectJack(module, direction, cvName, toneObject) {
	return {
		type: 'CONNECT_JACK',
		module,
		direction,
		cvName,
		toneObject
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
