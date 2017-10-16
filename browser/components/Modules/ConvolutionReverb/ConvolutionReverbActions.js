export function addConvolutionReverb() {
	return { type: 'ADD_CONVOLUTION_REVERB' }
}

export function removeConvolutionReverb(id) {
	return {
		type: 'REMOVE_CONVOLUTION_REVERB',
		id
	}
}

export function changeWetness(id, amount) {
	return {
		type: 'CHANGE_CONVOLUTION_REVERB_WETNESS',
		id,
		amount
	}
}

export function changeImpulseResponse(id, url) {
	return {
		type: 'CHANGE_CONVOLUTION_REVERB_IMPULSE_RESPONSE',
		id,
		url
	}
}

// export function changeLfoType(id, oscType) {
// 	return {
// 		type: 'CHANGE_ConvolutionReverb_TYPE',
// 		id,
// 		oscType
// 	}
// }
