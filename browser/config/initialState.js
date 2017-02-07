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

const initialState = {
	oscillators: fromJS({
		[uuid.v4()]: OscillatorInitialStateCreator()
	}),
	lfos: fromJS({
		[uuid.v4()]: LFOInitialStateCreator()
	}),
	envelopes: fromJS({
		[uuid.v4()]: EnvelopeInitialStateCreator()
	}),
	filters: fromJS({
		[uuid.v4()]: FilterInitialStateCreator()
	}),
	vcas: fromJS({
		[uuid.v4()]: VCAInitialStateCreator()
	}),
	speaker: fromJS({
		only: SpeakerInitialState
	}),
	midis: fromJS({
		[uuid.v4()]: MIDIInitialState
	}),
	eurorack: fromJS({
		patchCables: {
			active: false,
			input: null,
			output: null,
			color: 'darkred',
			colorOptions: ['orange', 'royalblue', 'purple', 'red', 'yellowgreen', 'forestgreen', 'violet', 'peachpuff' ],
			error: null,
			connections: {
				// white: {
				// 	input: {
				// 		module: 'example',
				// 		id: 'example',
				// 		cvName: 'example',
				// 		toneObject: 'example'
				// 	},
				// 	output: {
				// 		module: 'example',
				// 		id: 'example',
				// 		cvName: 'example',
				// 		toneObject: 'example'
				// 	}
				// }
			}
		},
	})
}

export default initialState