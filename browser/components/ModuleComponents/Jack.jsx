import React from 'react'
import KnobComponent from './KnobComponent'



const Jack = ({name, color, onJackClick}) => {
  const backgroundColor = color? color : 'black'
  color = color ? color : '#aaaaaa'

  return (
    <div className='jack-container' onClick={onJackClick} onContextMenu={onJackClick}>
      <div className='metal-container'>
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
        <div
          className='jack-center'
          style={{background: `${backgroundColor}`}}></div>
      </div>
      <div className='jack-name'>{name}</div>
    </div>
  )
}

export default Jack
