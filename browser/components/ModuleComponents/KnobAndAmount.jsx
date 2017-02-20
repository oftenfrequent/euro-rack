import React from 'react'
import Knob from './Knob'
import DisplayAmount from './DisplayAmount'



// const Knob = ({name, min, max, value, degreesTotal, sensitivity, onNewValue}) => {
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

export default KnobAndAmount
