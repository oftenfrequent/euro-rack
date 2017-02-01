export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'speaker') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'INIT_SPEAKER' :
			state.getIn(['only', 'analyser']).connect(state.getIn(['only', 'toneComponent']))
			return state
	}
	return state
}