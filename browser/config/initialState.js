import { fromJS } from 'immutable'
import uuid from 'uuid'
import Tone from 'tone'

import OscillatorInitialStateCreator from '../components/Modules/Oscillator/OscillatorInitialState'
import LFOInitialStateCreator from '../components/Modules/LFO/LFOInitialState'
import EnvelopeInitialStateCreator from '../components/Modules/Envelope/EnvelopeInitialState'
import FilterInitialStateCreator from '../components/Modules/Filter/FilterInitialState'
import VCAInitialStateCreator from '../components/Modules/VCA/VCAInitialState'
import SpeakerInitialState from '../components/Modules/Speaker/SpeakerInitialState'
import MIDIInitialState from '../components/Modules/MIDI/MIDIInitialState'
import EuroRackInitialState from '../components/EuroRack/EuroRackInitialState'

const initialState = {
	oscillators: fromJS({}),
	lfos: fromJS({}),
	envelopes: fromJS({}),
	filters: fromJS({}),
	vcas: fromJS({}),
	midis: fromJS({}),
	// oscillators: fromJS({
	// 	[uuid.v4()]: OscillatorInitialStateCreator()
	// }),
	// lfos: fromJS({
	// 	[uuid.v4()]: LFOInitialStateCreator()
	// }),
	// envelopes: fromJS({
	// 	[uuid.v4()]: EnvelopeInitialStateCreator()
	// }),
	// filters: fromJS({
	// 	[uuid.v4()]: FilterInitialStateCreator()
	// }),
	// vcas: fromJS({
	// 	[uuid.v4()]: VCAInitialStateCreator()
	// }),
	// midis: fromJS({
	// 	[uuid.v4()]: MIDIInitialState
	// }),
	speaker: fromJS({
		only: SpeakerInitialState
	}),
	eurorack: fromJS(EuroRackInitialState)
}

export default initialState