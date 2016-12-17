import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Map, fromJS } from 'immutable'
import logger from 'redux-logger'

import EuroRack from './components/EuroRack'

const initialState = fromJS({})
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case 'SOMETHING' :
			return state
		case 'ELSE' :
			return state
	}
	return state
}


const store = createStore(
	reducer,
	initialState,
	compose(applyMiddleware(logger((state) => Map(state).toJS())))
)

ReactDOM.render(
	<Provider store={store}>
		<EuroRack />
	</Provider>
	, document.getElementById('app')
)