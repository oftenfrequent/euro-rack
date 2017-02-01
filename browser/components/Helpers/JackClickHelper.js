export default (e, patchingActive, currentCableColor, inputJackStatus, outputJackStatus, module, id, direction, cvName, toneComponent, currentColor, connectJackCallback, disconnectJackCallback, errorConnectionCallback) => {

  const eventType = e.type // click or contextmenu

	if (currentColor && eventType === 'contextmenu') {
		console.log('DISCONNECT')
		// disconnect patchCable
	} else if (!currentColor && eventType === 'click') {
		if (patchingActive) {
			const directionError = checkIfDirectionIsAcceptable(inputJackStatus, outputJackStatus, direction)
			if (directionError) { return errorConnectionCallback(directionError) }
			connectJackCallback(currentCableColor, module, id, direction, cvName, toneComponent)
		} else {
			connectJackCallback(currentCableColor, module, id, direction, cvName, toneComponent)
		}
	}
}


const checkIfDirectionIsAcceptable = (inputJackStatus, outputJackStatus, direction) => {
	if (direction === 'input' && inputJackStatus) {
		return 'An input has already been selected'
	} else if (direction === 'output' && outputJackStatus) {
		return 'An output has already been selected'
	}
}