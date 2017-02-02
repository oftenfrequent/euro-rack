import { combineReducers } from 'redux'

import EuroRackReducer from '../components/EuroRackReducer'
import OscillatorReducer from '../components/Modules/Oscillator/OscillatorReducer'
import LFOReducer from '../components/Modules/LFO/LFOReducer'
import EnvelopeReducer from '../components/Modules/Envelope/EnvelopeReducer'
import FilterReducer from '../components/Modules/Filter/FilterReducer'
import VCAReducer from '../components/Modules/VCA/VCAReducer'
import SpeakerReducer from '../components/Modules/Speaker/SpeakerReducer'
import MIDIReducer from '../components/Modules/MIDI/MIDIReducer'

export default combineReducers({
	eurorack: EuroRackReducer,
	oscillators: OscillatorReducer,
	lfos: LFOReducer,
	envelopes: EnvelopeReducer,
	filters: FilterReducer,
	vcas: VCAReducer,
	speaker: SpeakerReducer,
	midis: MIDIReducer
})

