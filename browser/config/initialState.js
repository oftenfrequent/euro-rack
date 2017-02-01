import { fromJS } from 'immutable'
import uuid from 'uuid'
import Tone from 'tone'

import OscillatorInitialState from '../components/Modules/Oscillator/OscillatorInitialState'
import LFOInitialState from '../components/Modules/LFO/LFOInitialState'
import EnvelopeInitialState from '../components/Modules/Envelope/EnvelopeInitialState'
import FilterInitialState from '../components/Modules/Filter/FilterInitialState'
import SpeakerInitialState from '../components/Modules/Speaker/SpeakerInitialState'
import MIDIInitialState from '../components/Modules/MIDI/MIDIInitialState'

const initialState = {
	oscillators: fromJS({
		[uuid.v4()]: OscillatorInitialState
	}),
	lfos: fromJS({
		[uuid.v4()]: LFOInitialState
	}),
	envelopes: fromJS({
		[uuid.v4()]: EnvelopeInitialState
	}),
	filters: fromJS({
		[uuid.v4()]: FilterInitialState
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
			colorOptions: ['orange', 'royalblue', 'purple', 'red', 'yellowgreen', 'forestgreen', 'fuscia', 'peachpuff' ],
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