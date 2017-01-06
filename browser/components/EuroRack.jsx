import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone'
// import PureRenderMixin from 'react-addons-pure-render-mixin';

import Oscillator from './Oscillator'
import EnvelopeGenerator from './EnvelopeGenerator'

import '../app.scss'

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      osc: new Tone.Oscillator(0, "sine").start(),
      env: new Tone.AmplitudeEnvelope(0, 0.2, 1, 0.6)

    }
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  connectOscandEnv() {
    this.state.osc.connect(this.state.env)
    this.state.env.toMaster()
    this.state.env.triggerAttackRelease(0.8)
  }

  render(){
    return (
      <div>
        <Oscillator osc={this.state.osc}/>
        <EnvelopeGenerator env={this.state.env} onConnect={() => this.connectOscandEnv()}/>
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
)(App);
