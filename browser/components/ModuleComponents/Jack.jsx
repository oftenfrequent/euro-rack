import React from 'react'
import KnobComponent from './KnobComponent'



const Jack = ({name, color, onJackClick}) => {

  return (
    <div className='jack-container' onClick={onJackClick} >
      <div className='color-connector'
        style={{background: `${color}`}}></div>
      <div
        className='color-connector'
        style={{background: `${color}`}}></div>
      <div
        className='color-connector'
        style={{background: `${color}`}}></div>
      <div
        className='color-connector'
        style={{background: `${color}`}}></div>
      <div className='jack-center'></div>
      <h5 className='jack-name'>{name}</h5>
    </div>
  )
}

export default Jack
