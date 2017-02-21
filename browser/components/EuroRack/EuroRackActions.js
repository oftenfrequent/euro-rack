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

		// isENV

		// if env
		// envID
		// minValue
		// maxValue
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

export function setModuleOrder(order) {
	return {
		type: 'SET_ORDER',
		order
	}
}

export function pushIdToOrder(id) {
	return {
		type: 'PUSH_ORDER',
		id
	}
}

// export function errorConnectingJack(error) {
// 	return {
// 		type: 'DISCONNECT_JACK',
// 		error
// 	}
// }

export function changeOrderOfModule(orderNumber, module, id) {
	return {
		type: 'CHANGE_ORDER',
		orderNumber,
		module,
		id
	}
}