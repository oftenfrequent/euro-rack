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
			state.getIn(['only', 'analyser']).connect(state.getIn(['only', 'toneComponent']))
			return state
	}
	return state
}