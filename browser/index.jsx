import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Map, fromJS } from 'immutable'
import logger from 'redux-logger'
import Tone from 'tone'

import EuroRack from './components/EuroRack'
import Reducer from './components/EuroRackReducer'

const initialState = fromJS({
	selectedModule: null,
	vco: {
		oscillator: new Tone.Oscillator(0, 'sine').start(),
    min: 0,
    max: 1000,
		frequency: 0,
		type: 'sine',
		typeOptions: ['sine', 'square', 'triangle', 'sawtooth']
	},

	env: {
		envelope: new Tone.AmplitudeEnvelope(0.01, 0.2, 1, 0.6),
    min: 10,
    max: 1000,
    attack: 0,
    decay: 200,
    sustain: 1000,
    release: 600,
		attackCurve: 'linear',
		releaseCurve: 'exponential',
    curveOptions: ['linear', 'exponential', 'sine', 'ease', 'bounce', 'ripple', 'step']
	},

	fil: {
    filter: new Tone.Filter(400, 'lowpass', -12),
	  min: 0,
	  max: 1000,
	  frequency: 400,
	  type: 'lowpass',
	  typeOptions: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
	  rolloffOptions: [-12, -24, -48, -96],
	  rolloff: -12,
	}
})

const store = createStore(
	Reducer,
	initialState,
	compose(applyMiddleware(logger({stateTransformer:(state) => Map(state).toJS()})))
)

ReactDOM.render(
	<Provider store={store}>
		<EuroRack />
	</Provider>
	, document.getElementById('app')
)