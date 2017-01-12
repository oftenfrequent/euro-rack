import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import logger from 'redux-logger'

import EuroRack from './components/EuroRack'
// import Reducer from './components/EuroRackReducer'
import reducer from './config/combineReducers'
import initialState from './config/initialState'

const store = createStore(
	reducer,
	initialState,
	compose(applyMiddleware(logger({stateTransformer:(state) => Map(state).toJS()})))
)

ReactDOM.render(
	<Provider store={store}>
		<EuroRack />
	</Provider>
	, document.getElementById('app')
)