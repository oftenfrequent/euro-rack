import React from 'react'
import KnobComponent from './KnobComponent'



const Jack = ({name, onJackClick}) => {

  return (
    <div className='jack-container' onClick={onJackClick} >
      <div className='color-connector'></div>
      <div
        className='color-connector'
        style={{transform: `rotate(45deg)`}}></div>
      <div
        className='color-connector'
        style={{transform: `rotate(90deg)`}}></div>
      <div
        className='color-connector'
        style={{transform: `rotate(135deg)`}}></div>
      <div className='color-connector'></div>
      <div className='jack-center'></div>
      <h5 className='jack-name'>{name}</h5>
    </div>
  )
}

export default Jack
