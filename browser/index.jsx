import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Router, hashHistory } from 'react-router'
import { Map } from 'immutable'
import logger from 'redux-logger'
import { apiMiddleware } from 'redux-api-middleware'
import WebFont from 'webfontloader'

import appRoutes from './pages'
// import EuroRack from './components/EuroRack/EuroRack'
import reducer from './config/combineReducers'
import initialState from './config/initialState'
import {
	connectJackMiddleWare,
	patchingMiddleWare,
	deleteModuleMiddleWare,
	changeBPM,
	walkthroughMiddleware
} from './config/middleware'

import './style/app.scss'

WebFont.load({ typekit: { id: process.env.WEBFONT_ID } })

let store

if (process.env.NODE_ENV === 'production') {
	store = createStore(
		reducer,
		initialState,
		compose(applyMiddleware(
			apiMiddleware,
			connectJackMiddleWare,
			patchingMiddleWare,
			deleteModuleMiddleWare,
			changeBPM,
			walkthroughMiddleware
		))
	)
} else {
	store = createStore(
		reducer,
		initialState,
		compose(applyMiddleware(
			apiMiddleware,
			connectJackMiddleWare,
			patchingMiddleWare,
			deleteModuleMiddleWare,
			changeBPM,
			walkthroughMiddleware,
			logger({stateTransformer:(state) => Map(state).toJS()})
		))
	)
}


ReactDOM.render(
	<Provider store={store}>
    {appRoutes()}
	</Provider>
	, document.getElementById('app')
)