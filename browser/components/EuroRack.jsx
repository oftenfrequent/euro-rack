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
//    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render(){
    return (
      <div>
        <Oscillator/>
        <EnvelopeGenerator/>
        <Filter/>
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
