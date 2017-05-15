import React from 'react'
import { expect } from 'chai'
import { fromJS } from 'immutable'

import EnvelopeReducer from '../EnvelopeReducer'
import EnvelopeInitialState from '../EnvelopeInitialState'
import {
	addEnvelope,
  removeEnvelope,
  changeCurve,
  changeValue,
  changeTimeLength,
  triggerAttack,
  triggerRelease
} from '../EnvelopeActions'

describe('EnvelopeReducer', () => {
	const initialState = fromJS({})
  const oneLoadedState = EnvelopeReducer(initialState, addEnvelope())

  it('should handle RESET_EURORACK', () => {
  	const action = { type: 'RESET_EURORACK' }
  	const nextState = EnvelopeReducer(oneLoadedState, action)
  	expect(Array.from(oneLoadedState.keys()).length).to.equal(1)
  	expect(Array.from(nextState.keys()).length).to.equal(0)
  })

  it('should handle ADD_ENV', () => {
  	const action = addEnvelope()
  	const nextState = EnvelopeReducer(initialState, action)
  	expect(Array.from(nextState.keys()).length).to.equal(1)
  })

  it('should handle REMOVE_ENV on correct ID', () => {
  	const action = removeEnvelope(Array.from(oneLoadedState.keys())[0])
  	const nextState = EnvelopeReducer(oneLoadedState, action)
  	expect(Array.from(nextState.keys()).length).to.equal(0)
  })

  it('should not handle REMOVE_ENV on incorrect ID', () => {
  	const action = removeEnvelope('alsfhaidufhailsdnals')
  	const nextState = EnvelopeReducer(oneLoadedState, action)
  	expect(Array.from(nextState.keys()).length).to.equal(1)
  })
})
