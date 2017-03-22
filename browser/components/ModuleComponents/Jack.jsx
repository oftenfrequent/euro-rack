import React from 'react'
import KnobComponent from './KnobComponent'
import classNames from 'classnames'


const Jack = ({name, color, onJackClick, attention}) => {
  const backgroundColor = color ? color : 'black'
  color = color ? color : '#aaaaaa'

  const metalClasses = classNames({'metal-container': true, 'active': attention })
  return (
    <div className='jack-container'>
      <div className={metalClasses} onClick={onJackClick} onContextMenu={onJackClick}>
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
      { name ? <div className='jack-name'>{name}</div> : null }
    </div>
  )
}

export default Jack
