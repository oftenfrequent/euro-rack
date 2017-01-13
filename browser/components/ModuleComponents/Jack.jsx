import React from 'react'
import KnobComponent from './KnobComponent'



const Jack = ({name, color, onJackClick}) => {
  color = color ? color : '#aaaaaa'

  return (
    <div className='jack-container' onClick={onJackClick} onContextMenu={onJackClick}>
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
