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
      <div className='jack-name'>{name}</div>
    </div>
  )
}

export default Jack
