import Tone from 'tone'

export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'speaker') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'speaker') {
				return state.setIn([action.inputId, 'input', action.inputCvName], null)
			} else if (action.outputModule === 'speaker') {
				return state.setIn([action.outputId, 'output', action.outputCvName], null)
			} else {
				return state
			}
		case 'INIT_SPEAKER' :
			state.getIn(['only', 'blankToneComponent']).connect(state.getIn(['only', 'analyser']))
			state.getIn(['only', 'analyser']).connect(state.getIn(['only', 'toneComponent']))
			return state
		case 'CHANGE_BPM' :
			console.log('Tone.Transport.bpm.value', Tone.Transport.bpm.value)
			Tone.Transport.bpm.value = action.value
			console.log('Tone.Transport.bpm.value', Tone.Transport.bpm.value)
			return state.setIn(['only', 'currentBPM'], action.value)
	}
	return state
}