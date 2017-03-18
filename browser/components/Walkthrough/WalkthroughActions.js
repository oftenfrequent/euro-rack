export function initialIntroduction(oscillatorId) {
	return {
		type: 'WALKTHROUGH',
		inputModule: 'speaker',
		inputId: 'only',
		outputModule: 'oscillators',
		outputId: oscillatorId,
		text: "Let's start by getting you used to patching modules together! We have an Oscillator and a Speaker here. Start by connecting the output of the Sine wave to the Speaker!"
	}
}

// export function changeCurve(id, curveType) {
// 	return {
// 		type: 'CHANGE_ENV_CURVE_TYPE',
// 		id,
// 		curveType
// 	}
// }

// export function changeValue(id, component, value) {
// 	return {
// 		type: 'CHANGE_ENV_COMP_VALUE',
// 		id,
// 		component,
// 		value
// 	}
// }

// export function changeTimeLength(id, value) {
// 	return {
// 		type: 'CHANGE_ENV_TIME_LENGTH',
// 		id,
// 		value
// 	}
// }

// export function triggerAttack(id) {
// 	return {
// 		type: 'TRIGGER_ENV_ATTACK',
// 		id
// 	}
// }

// export function triggerRelease(id) {
// 	return {
// 		type: 'TRIGGER_ENV_RELEASE',
// 		id
// 	}
// }