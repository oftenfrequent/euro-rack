export default (state = {}, action) => {
	switch(action.type) {

		case 'CONNECT_JACK' :
			if (action.module === 'envelopes') {
				return state.setIn([action.id, action.direction, action.cvName], action.color )
			} else {
				return state
			}
		case 'CHANGE_ENV_CURVE_TYPE' :
			return state.setIn([action.id, 'attackCurve'], action.curveType )
									.setIn([action.id, 'releaseCurve'], action.curveType )
									.updateIn([action.id, 'toneComponent'], (env) => {
										env.attackCurve = action.curveType
										env.releaseCurve = action.curveType
										return env
									})
		case 'CHANGE_ENV_COMP_VALUE' :
			return state.setIn([action.id, action.component], action.value )
									.updateIn([action.id, 'toneComponent'], (env) => {
										if (action.component === 'sustain') {
											env[action.component] = action.value / 1000
										} else {
											env[action.component] = action.value / 100
										}
										return env
									})
	}
	return state
}