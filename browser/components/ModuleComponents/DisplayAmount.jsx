import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const DisplayAmount = ({type, min, max, value, changeValue, active, changeActive}) => {
  const onBlur = (e) => {
    changeActive()
    changeValue(e.target.value)
  }
  const clickValue = (e) => changeActive()

  let viewClasses = classNames({'display-amount-view': true, 'hidden': active})
  let inputClasses = classNames({'display-amount-input': true, 'hidden': !active})

  return (
    <div className='display-amount-container'>
      <div className={viewClasses} onClick={(e) => clickValue(e)}>{value}</div>
      {active
        ?(<input
            className={inputClasses}
            type={type || 'number'}
            defaultValue={value}
            min={min}
            max={max}
            onBlur={(e) => onBlur(e)}
          />
        ) : null
      }
    </div>
  )
}

DisplayAmount.propTypes = {
  type: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  value: React.PropTypes.string,
  // changeValue: React.PropTypes.function
}

export default DisplayAmount