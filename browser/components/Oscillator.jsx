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
      frequency: 440,
      degreesValue: 0,
      min: 0,
      max: 8000,
      osc: new Tone.Oscillator(440, "sine").toMaster().start()
    }
  }

  onMouseDown(e) {
    const y = e.clientY
    this.setState({clickDownY: y})
    // const x = e.clientX
    // console.log('X, Y - ', x, y)
    document.addEventListener("mousemove", this.state.bindedFunction)
    document.addEventListener('mouseup', () => document.removeEventListener('mousemove', this.state.bindedFunction))
  }

  handleMouseMove(e) {
    const y = e.clientY
    const difference = this.state.clickDownY - y
    console.log('difference', difference)
    const percentChange = this.distanceToPercentageChange(difference)
    console.log('percentage', percentChange)
    // const rotationalDegrees = percentChange * 180
    // console.log('rotationalDegrees', rotationalDegrees)

    const newFrequency = this.state.frequency + (percentChange/100 * 8000)
    const newDegrees = this.state.degreesValue + (percentChange/100 * 180)
    console.log('newFrequency', newFrequency)
    this.setState({
      frequency: newFrequency,
      degreesValue: newDegrees
    }, () => {
      // this.state.osc.frequency.value = newFrequency
    })
    // document.removeEventListener('mousemove', this.state.bindedFunction)
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

  // distanceToPercentageChange(amount) {
  //   // dist from center
  //   const dist = 100
  //   // total freq range
  //   const frequency = 8000
  //   return (dist * 100) / (frequency * 100)
  // }

  handleValueChange(value) {

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

  render(){
    const style = {
      transform: 'rotate(15deg)'
    }

    return (
      <div>
        <input
          type="number"
          defaultValue={this.state.frequency}
          min={this.state.min}
          max={this.state.max}
          onBlur={(e) => this.onChange(e)}
        />
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
