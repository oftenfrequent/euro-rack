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
		color,

		// ADDED BY MIDDLEWARE
		// inputModule,
		// inputId,
		// inputToneObject,
		// inputCvName,

		// outputModule,
		// outputId,
		// outputToneObject,
		// outputCvName


		// // inputDirection,
		// // outputDirection,
	}
}

export function errorConnectingJack(error) {
	return {
		type: 'DISCONNECT_JACK',
		error
	}
}

export function changeOrderOfModule(orderNumber, module, id) {
	return {
		type: 'CHANGE_ORDER',
		orderNumber,
		module,
		id
	}
}