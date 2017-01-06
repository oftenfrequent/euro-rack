import React from 'react'
import { connect } from 'react-redux'

const KnobComponent = ({degreesValue, sensitivity, onChange}) => {
  let initialPositionOfYOnClickDown = 0

  const distanceToPercentageChange = (distance) => {
    return distance >= sensitivity ? 100 :
           distance <= -1*(sensitivity) ? -100 : (distance/sensitivity)*100
  }

  const onMouseDown = (e) => {
    e.preventDefault();
    initialPositionOfYOnClickDown = e.clientY
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMove))
  }

  const handleMouseMove = (e) => {
    const y = e.clientY
    const difference = (initialPositionOfYOnClickDown - y)
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

export default KnobComponent
