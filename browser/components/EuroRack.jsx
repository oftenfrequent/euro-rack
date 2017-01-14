import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone'
// import PureRenderMixin from 'react-addons-pure-render-mixin';

import Oscillator from './Modules/Oscillator/Oscillator'
import LFO from './Modules/LFO/LFO'
import MIDI from './Modules/MIDI/MIDIComponent'
import EnvelopeGenerator from './Modules/EnvelopeGenerator'
import Filter from './Modules/Filter'
import Speaker from './Modules/Speaker/Speaker'

import '../app.scss'

export class App extends React.Component {
  constructor(props){
    super(props);
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render(){
    return (
      <div>
        <div>{this.props.error}</div>
        <Oscillator/>
        <LFO/>
        <MIDI/>
        <EnvelopeGenerator/>
        <Filter/>
        <Speaker/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    error: state.eurorack.getIn(['connectingCables', 'error'])
  }
};

export default connect(
  mapStateToProps
)(App);
