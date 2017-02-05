export function connectJack(color, module, id, direction, cvName, toneObject) {
	return {
		type: 'CONNECT_JACK',
		color,
		module,
		id,
		direction,
		cvName,
		toneObject

		// isLFO

		// if lfo
		// lfoID
		// midValue
		// minValue
		// maxValue
		// distance
	}
}

export function disconnectJack(color) {
	return {
		type: 'DISCONNECT_JACK',
		color
	}
}

export function errorConnectingJack(error) {
	return {
		type: 'DISCONNECT_JACK',
		error
	}
}