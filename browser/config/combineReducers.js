import { combineReducers } from 'redux'

// import OscillatorReducer from '../components/Modules/Oscillator/OscillatorReducer'
// import SpeakerReducer from '../components/Modules/Speaker/SpeakerReducer'
import EuroRackReducer from '../components/EuroRackReducer'

export default combineReducers({
	eurorack: EuroRackReducer,
	// oscillator: OscillatorReducer
})

