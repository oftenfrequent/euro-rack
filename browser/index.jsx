import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Map, fromJS } from 'immutable'
import logger from 'redux-logger'

import EuroRack from './components/EuroRack'
import Reducer from './components/EuroRackReducer'

const initialState = fromJS({ selectedModule: null })

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