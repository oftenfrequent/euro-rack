import { combineReducers } from 'redux'

import EuroRackReducer from '../components/EuroRack/EuroRackReducer'
import OscillatorReducer from '../components/Modules/Oscillator/OscillatorReducer'
import LFOReducer from '../components/Modules/LFO/LFOReducer'
import EnvelopeReducer from '../components/Modules/Envelope/EnvelopeReducer'
import FilterReducer from '../components/Modules/Filter/FilterReducer'
import ConvolutionReverbReducer from '../components/Modules/ConvolutionReverb/ConvolutionReverbReducer'
import VCAReducer from '../components/Modules/VCA/VCAReducer'
import PingPongReducer from '../components/Modules/PingPong/PingPongReducer'
import SpeakerReducer from '../components/Modules/Speaker/SpeakerReducer'
import MIDIReducer from '../components/Modules/MIDI/MIDIReducer'
import WalkthroughReducer from '../components/Walkthrough/WalkthroughReducer'

export default combineReducers({
	eurorack: EuroRackReducer,
	oscillators: OscillatorReducer,
	lfos: LFOReducer,
	envelopes: EnvelopeReducer,
  convolutionReverbs: ConvolutionReverbReducer,
	filters: FilterReducer,
	vcas: VCAReducer,
	pingPongs: PingPongReducer,
	speaker: SpeakerReducer,
	midis: MIDIReducer,
	walkthrough: WalkthroughReducer
})

