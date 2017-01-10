import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone'
// import PureRenderMixin from 'react-addons-pure-render-mixin';

import Oscillator from './Modules/Oscillator'
import EnvelopeGenerator from './Modules/EnvelopeGenerator'
import Filter from './Modules/Filter'
import MasterOut from './Modules/MasterOut'

import '../app.scss'

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      env: new Tone.AmplitudeEnvelope(0, 0.2, 1, 0.6),
      filter: new Tone.Filter(0, 'lowpass', -12)

    }
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  triggerAttackRelease() {
    this.state.env.triggerAttackRelease(0.8)
  }

  render(){
    return (
      <div>
        <Oscillator/>
        <EnvelopeGenerator
          env={this.state.env}
          onConnect={() => this.connectOscandEnv()}
          triggerHit={() => this.triggerAttackRelease()}
        />
        <Filter filter={this.state.filter} />
        <MasterOut/>
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
