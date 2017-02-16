import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

export class DisplayAmount extends React.Component {
  constructor(props) {
    super(props)
  }

  onBlur(e) {
    this.props.changeActive()
    this.props.changeValue(parseInt(e.target.value))
  }

  clickValue(e) {
    setTimeout(() => {
      console.log('SET ACTIVE TO INPUT', ReactDOM.findDOMNode(this.refs.input))
      ReactDOM.findDOMNode(this.refs.input).focus()
    }, 30)
    this.props.changeActive()
  }


  render(){
    let viewClasses = classNames({'display-amount-view': true, 'hidden': this.props.active})
    let inputClasses = classNames({'display-amount-input': true, 'hidden': !this.props.active})
    return (
      <div className='display-amount-container'>
        <div className={viewClasses} onClick={(e) => this.clickValue(e)}>{Math.round(this.props.value * 100) / 100}</div>
        {this.props.active
          ?(<input
              className={inputClasses}
              ref='input'
              type={this.props.type || 'number'}
              defaultValue={Math.round(this.props.value * 100) / 100}
              min={this.props.min}
              max={this.props.max}
              onBlur={(e) => this.onBlur(e)}
            />
          ) : null
        }
      </div>
    )
  }
}

DisplayAmount.propTypes = {
  type: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  value: React.PropTypes.number,
  // changeValue: React.PropTypes.function
}

export default DisplayAmount