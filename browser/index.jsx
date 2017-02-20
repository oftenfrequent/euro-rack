import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import logger from 'redux-logger'

import EuroRack from './components/EuroRack/EuroRack'
import reducer from './config/combineReducers'
import initialState from './config/initialState'
import {connectJackMiddleWare, patchingMiddleWare, deleteModuleMiddleWare} from './config/middleware'

let store

if (process.env.NODE_ENV === 'production') {
	store = createStore(
		reducer,
		initialState,
		compose(applyMiddleware(
			connectJackMiddleWare,
			patchingMiddleWare,
			deleteModuleMiddleWare
		))
	)
} else {
	store = createStore(
		reducer,
		initialState,
		compose(applyMiddleware(
			connectJackMiddleWare,
			patchingMiddleWare,
			deleteModuleMiddleWare,
			logger({stateTransformer:(state) => Map(state).toJS()})
		))
	)
}


ReactDOM.render(
	<Provider store={store}>
		<EuroRack />
	</Provider>
	, document.getElementById('app')
)