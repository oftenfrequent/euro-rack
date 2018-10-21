export function addPingPong() {
	return { type: 'ADD_PING_PONG' }
}

export function removePingPong(id) {
	return {
		type: 'ADD_PING_PONG',
		id,
	}
}

export function togglePPTimeAndFreq(id) {
	return {
		type: 'TOGGLE_PP_TIME_FREQ',
		id
	}
}

export function changePPTime(id, delayTime) {
	return {
		type: 'CHANGE_PP_DELAY_TIME',
		id,
		delayTime
	}
}

export function changePPWet(id, amount) {
	return {
		type: 'CHANGE_PP_WETNESS',
		id,
		amount
	}
}

export function changePPFeedback(id, amount) {
	return {
		type: 'CHANGE_PP_FEEDBACK',
		id,
		amount
	}
}

// export function changeFilFreq(id, frequency) {
// 	return {
// 		type: 'CHANGE_FIL_FREQ',
// 		id,
// 		frequency
// 	}
// }

// export function changeFilResonace(id, q) {
// 	return {
// 		type: 'CHANGE_FIL_RESONANCE',
// 		id,
// 		q
// 	}
// }