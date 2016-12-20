import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tone from 'tone'

import '../app.scss'

export class Oscillator extends React.Component {
  constructor(props){
    super(props);
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    const bindedFunction = this.handleMouseMove.bind(this)
    this.state = {
      bindedFunction,
      clickDownY: 0,
      frequency: {
        value: 0,
        min: 0,
        max: 8000
      },
      type: "sine",
      optionTypes: ['sine', 'square', 'triangle'],
      degreesValue: 0,
      osc: new Tone.Oscillator(0, "sine").toMaster().start()
    }
  }

  onMouseDown(e) {
    const y = e.clientY
    this.setState({clickDownY: y})
    // const x = e.clientX
    document.addEventListener("mousemove", this.state.bindedFunction)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', this.state.bindedFunction))
  }

  handleMouseMove(e) {
    const y = e.clientY
    const difference = this.state.clickDownY - y
    const percentChange = this.distanceToPercentageChange(difference)
    console.log('percentage', percentChange)

    const newFrequency = this.generateNewFrequency(percentChange)
    const newDegrees = this.generateNewDegrees(percentChange)
    console.log('newFrequency', newFrequency)
    this.setState({
      frequency: {
        value: newFrequency,
        min: this.state.frequency.min,
        max: this.state.frequency.max
      },
      degreesValue: newDegrees
    }, () => {
      console.log(this.state.frequency)
      this.state.osc.frequency.value = newFrequency })
  }

  generateNewFrequency(percentChange) {
    const newFrequency = this.state.frequency.value + (percentChange/100 * 8000)
    return newFrequency <= this.state.frequency.min ? this.state.frequency.min
      : newFrequency >= this.state.frequency.max ? this.state.frequency.max
      : newFrequency
  }

  generateNewDegrees(percentChange) {
    const newDegrees = this.state.degreesValue + (percentChange/100 * 180)
    return newDegrees <= 0 ? 0 : newDegrees >= 180 ? 180 : newDegrees
  }


  distanceToPercentageChange(distance) {
    if(distance >= 100) {
      return 100
    } else if(distance <= -100) {
      return -100
    } else {
      return distance
    }
  }

  onChange(e) {
    const freq = e.target.value
    const y = e.clientY
    // const x = e.clientX
    // console.log('X, Y - ', x, y)
    this.setState({frequency: freq, clickDownY: y}, () => {
      console.log('CHANGEDD!!!!', this.state)
      this.state.osc.frequency.value = freq
    })
  }

  onChangeType(e) {
    const type = e.target.value
    this.setState({type}, () => {this.state.osc.type = type})
  }

  render(){
    const style = {
      transform: `rotate(${this.state.degreesValue}deg)`
    }
    console.log('this.state.optionTypes', this.state.optionTypes)

    return (
      <div>
        <input
          type="number"
          defaultValue={this.state.frequency.value}
          min={this.state.min}
          max={this.state.max}
          onBlur={(e) => this.onChange(e)}
          value={this.state.frequency.value}
        />
        <select onChange={(e) => this.onChangeType(e)}>
          {this.state.optionTypes.map( opt =>
            <option key={opt} value={opt}>{opt}</option>
          )}
        </select>
        <div style={style} className='knob' onMouseDown={(e) => this.onMouseDown(e)}>
          <div className='line'></div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
  }
};

export default connect(
  mapStateToProps
)(Oscillator);
