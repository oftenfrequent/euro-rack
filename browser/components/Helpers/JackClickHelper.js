export default (e, patchingActive, currentCableColor, inputJackStatus, outputJackStatus, module, id, direction, cvName, toneComponent, currentColor, connectJackCallback, disconnectJackCallback, errorConnectionCallback) => {

  const eventType = e.type // click or contextmenu (rightclick)

	if (currentColor && eventType === 'contextmenu') {
		e.preventDefault()
		disconnectJackCallback(currentColor)
	} else if (!currentColor && eventType === 'click') {
		if (patchingActive) {
			const directionError = checkDirectionError(inputJackStatus, outputJackStatus, direction)
			if (directionError) { return errorConnectionCallback(directionError) }
			const sameModule = checkModule(inputJackStatus, outputJackStatus, id)
			if (sameModule) { return errorConnectionCallback(sameModule) }
			connectJackCallback(currentCableColor, module, id, direction, cvName, toneComponent)
		} else {
			connectJackCallback(currentCableColor, module, id, direction, cvName, toneComponent)
		}
	}
}

// can't plug an input into an input && output/output
const checkDirectionError = (inputJackStatus, outputJackStatus, direction) => {
	if (direction === 'input' && inputJackStatus) {
		return 'An input has already been selected'
	} else if (direction === 'output' && outputJackStatus) {
		return 'An output has already been selected'
	}
}

//can't plug a module into itself
const checkModule = (inputJackStatus, outputJackStatus, id) => {
	const currentSelectedModuleId = inputJackStatus ? inputJackStatus.get('id') : outputJackStatus.get('id')
	if (currentSelectedModuleId === id) {
		return 'You cannot connect a module into itself'
	}
}