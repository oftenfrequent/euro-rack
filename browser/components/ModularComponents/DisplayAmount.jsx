import React from 'react'

const DisplayAmount = ({type, min, max, value, changeValue}) => {
  const onBlur = (e) => {
    const freq = e.target.value
    changeValue(freq)
  }

  return (
    <div>
      <span>{value}</span>
      <input
        type={type || 'number'}
        defaultValue={value}
        min={min}
        max={max}
        onBlur={(e) => this.onBlur(e)}
      />
    </div>
  )
}

DisplayAmount.propTypes = {
  type: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  value: React.PropTypes.number,
  changeValue: React.PropTypes.function
}

export default DisplayAmount