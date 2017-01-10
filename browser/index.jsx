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