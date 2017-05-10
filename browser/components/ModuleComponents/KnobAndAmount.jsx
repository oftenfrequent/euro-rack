import React from 'react'
import PropTypes from 'prop-types'


import Knob from './Knob'
import DisplayAmount from './DisplayAmount'

export class KnobAndAmount extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  onChangeActive() {
    if(!this.props.hideDisplay) {
      this.setState({active: !this.state.active})
    }
  }

  render() {
    return (
      <div className={ this.props.hideDisplay ? 'no-amount' : ''}>
        <DisplayAmount
          type={this.props.type || 'number'}
          suffix={this.props.suffix || ''}
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          changeValue={(v) => this.props.onNewValue(v)}
          active={this.state.active}
          changeActive={() => this.onChangeActive()}
        />
        <Knob
          name={this.props.name}
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          degreesTotal={this.props.degreesTotal}
          sensitivity={this.props.sensitivity}
          onNewValue={(v) => this.props.onNewValue(v)}
        />
      </div>
    )
  }
}

Knob.propTypes = {
  hideDisplay: PropTypes.bool,
  type: PropTypes.string,
  suffix: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  degreesTotal: PropTypes.number.isRequired,
  sensitivity: PropTypes.number.isRequired,
  onNewValue: PropTypes.func.isRequired
}

export default KnobAndAmount
