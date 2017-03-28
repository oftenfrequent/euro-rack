import { fromJS, List } from 'immutable'
import Tone from 'tone'


const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'WALKTHROUGH_STEP':
			return state.set('text', action.text)
									.set('active', true)
									.set('completedText', action.completedText)
									.set('stepCompleted', false)
		case 'WALKTHROUGH_STEP_COMPLETED':
			return state.set('active', true)
									.set('stepCompleted', true)
		case 'WALKTHROUGH_COMPLETED':
			return state.set('text', null)
									.set('completedWalkthrough', true)
									.set('completedText', null)
									.set('active', false)
									.set('stepCompleted', true)
	}
	return state
}

export default reducer