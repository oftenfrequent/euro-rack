import { fromJS, List } from 'immutable'
import Tone from 'tone'


const reducer = (state = {}, action) => {
	switch(action.type) {
		case 'WALKTHROUGH_STEP':
			return state.set('text', action.text)
									.set('active', true)
	}
	return state
}

export default reducer