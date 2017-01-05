import React from 'react'
import { connect } from 'react-redux'

const Knob = ({degreesValue, sensitivity, onChange}) => {
  let initialPositionOfYOnClickDown = 0

  const distanceToPercentageChange = (distance) => {
    return distance >= sensitivity ? sensitivity :
           distance <= -1*(sensitivity) ? -1*(sensitivity) : distance
  }

  const onMouseDown = (e) => {
    initialPositionOfYOnClickDown = e.clientY
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMove))
  }

  const handleMouseMove = (e) => {
    const y = e.clientY
    const difference = (initialPositionOfYOnClickDown - y) / sensitivity
    const percentChange = distanceToPercentageChange(difference)
    onChange(percentChange)
  }

  return (
    <div>
      <div
        style={{transform: `rotate(${degreesValue}deg)`}}
        className='knob'
        onMouseDown={(e) => onMouseDown(e)}
      >
        <div className='line'></div>
      </div>
    </div>
  )
}

export default Knob
