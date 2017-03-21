import Tone from 'tone'
import { fromJS } from 'immutable'

import SpeakerInitialState from './SpeakerInitialState'

export default (state = {}, action) => {
	switch(action.type) {
		case 'RESET_EURORACK' :
			return state = fromJS({only: SpeakerInitialState})
		case 'CONNECT_JACK' :
			if (action.module === 'speaker') {
				return state.setIn([action.id, action.direction, action.cvName, 'color'], action.color )
										.setIn([action.id, action.direction, action.cvName, 'attention'], false)
			} else {
				return state
			}
		case 'DISCONNECT_JACK' :
			if (action.inputModule === 'speaker') {
				return state.setIn([action.inputId, 'input', action.inputCvName, 'color'], null)
										.setIn([action.inputId, 'input', action.inputCvName, 'attention'], false)
			} else {
				return state
			}
		case 'INIT_SPEAKER' :
			state.getIn(['only', 'blankToneComponent']).connect(state.getIn(['only', 'analyser']))
			state.getIn(['only', 'analyser']).connect(state.getIn(['only', 'toneComponent']))
			return state
		case 'CHANGE_BPM' :
			Tone.Transport.bpm.value = action.value
			return state.setIn(['only', 'currentBPM'], action.value)
		case 'WALKTHROUGH_STEP' :
			if (action.inputModule === 'speaker') {
				return state.setIn([action.inputId, 'input', 'sound', 'attention'], true)
			} else {
				return state
			}
	}
	return state
}