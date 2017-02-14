export function addEnvelope() {
	return { type: 'ADD_ENV' }
}

export function changeCurve(id, curveType) {
	return {
		type: 'CHANGE_ENV_CURVE_TYPE',
		id,
		curveType
	}
}

export function changeValue(id, component, value) {
	return {
		type: 'CHANGE_ENV_COMP_VALUE',
		id,
		component,
		value
	}
}

export function triggerAttack(id) {
	return {
		type: 'TRIGGER_ENV_ATTACK',
		id
	}
}

export function triggerRelease(id) {
	return {
		type: 'TRIGGER_ENV_RELEASE',
		id
	}
}