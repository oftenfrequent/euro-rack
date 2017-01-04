import React from 'react';
import { connect } from 'react-redux';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import Oscillator from './Oscillator'

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
